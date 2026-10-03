import test from "node:test";
import assert from "node:assert/strict";
import {
  englishContentImport,
  englishResumeImport,
} from "../lib/english-content-import.mjs";
import { buildEnglishImportPlan } from "../lib/english-import-plan.mjs";
import { localizeArticle, localizeProject } from "../lib/localization.mjs";

const docs = () =>
  englishContentImport.map((item) => ({
    _id: item.id,
    _rev: "revision",
    _type: item.type,
    ...structuredClone(item.source),
    coverImage: "/original.mp4",
    sample: item.type === "testimonial",
  }));
test("all published content has complete usable translations, including expanded article text", () => {
  assert.equal(
    englishContentImport.filter((x) => x.type === "project").length,
    4,
  );
  assert.equal(
    englishContentImport.filter((x) => x.type === "article").length,
    3,
  );
  for (const item of englishContentImport) {
    const translated = { ...item.source, en: item.en, englishReady: true };
    if (item.type === "project") assert.ok(localizeProject(translated));
    if (item.type === "article") {
      translated.sections = item.lists.sections;
      assert.ok(localizeArticle(translated));
    }
    for (const value of Object.values(item.en))
      assert.doesNotMatch(value, /[\u0600-\u06ff]/);
    for (const sections of Object.values(item.lists))
      for (const section of sections)
        for (const value of Object.values(section.en))
          assert.doesNotMatch(value, /[\u0600-\u06ff]/);
  }
  assert.equal(englishResumeImport.experiences.length, 6);
  assert.equal(englishResumeImport.highlights.length, 4);
});
test("import only patches English fields and guards revisions, leaving Arabic/media/order/sample flags untouched", () => {
  const source = docs(),
    before = structuredClone(source),
    plan = buildEnglishImportPlan(source);
  assert.equal(plan.publishedCount, 16);
  assert.equal(plan.create.length, 1);
  for (const patch of plan.patches) {
    assert.equal(patch.ifRevisionID, "revision");
    assert.ok(
      Object.keys(patch.set).every(
        (key) => key === "en" || key === "englishReady" || key.endsWith("].en"),
      ),
    );
  }
  assert.deepEqual(source, before);
  const existing = {
    ...structuredClone(englishResumeImport),
    _rev: "resume-revision",
  };
  assert.equal(buildEnglishImportPlan([...source, existing]).create.length, 0);
});
test("changed published Arabic aborts while changed drafts are left alone", () => {
  const source = docs();
  source[0].mainTitle = "Changed";
  assert.throws(() => buildEnglishImportPlan(source));
  const original = docs(),
    draft = {
      ...original[0],
      _id: "drafts." + original[0]._id,
      mainTitle: "Unpublished changes",
    };
  const plan = buildEnglishImportPlan([...original, draft]);
  assert.deepEqual(plan.skippedDrafts, [draft._id]);
  assert.ok(!plan.patches.some((p) => p.id === draft._id));
});
test("rerunning the importer preserves subsequent English edits and publication choices", () => {
  const source = docs();
  source[0].en = {
    mainTitle: "Edited English title",
    coverImageMedia: { asset: { _ref: "existing-asset" } },
  };
  source[0].englishReady = false;
  const patch = buildEnglishImportPlan(source).patches.find(
    (p) => p.id === source[0]._id,
  );
  assert.equal(patch.set.en.mainTitle, "Edited English title");
  assert.equal(patch.set.englishReady, false);
  assert.equal(patch.set.en.coverImageMedia.asset._ref, "existing-asset");
});
