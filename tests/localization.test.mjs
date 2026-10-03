import test from "node:test";
import assert from "node:assert/strict";
import {
  localizeProject,
  localizeArticle,
  languageTarget,
  localePath,
} from "../lib/localization.mjs";
import { localizedSchema } from "../sanity/localized.js";
import { projectSchema } from "../sanity/schema.js";
import { articleSchema } from "../sanity/article.js";

const project = {
  id: "sample",
  mainTitle: "عربي",
  summary: "وصف عربي",
  researchLead: "بحث عربي",
  categories: ["mobile"],
  coverImage: "/shared.mp4",
  gallery: ["/one.gif"],
  englishReady: true,
  en: {
    mainTitle: "English project",
    summary: "English summary",
    cardDescription: "English card",
  },
};
test("English publication is opt-in and requires core translated content", () => {
  assert.equal(localizeProject({ ...project, englishReady: false }), null);
  assert.equal(
    localizeProject({ ...project, en: { mainTitle: "Only a title" } }),
    null,
  );
  const result = localizeProject(project);
  assert.equal(result.mainTitle, "English project");
  assert.equal(result.cardTitle, "English project");
  assert.equal(result.researchLead, "");
  assert.equal(project.researchLead, "بحث عربي");
});
test("media, taxonomy and URLs are shared unless English media are supplied", () => {
  const shared = localizeProject(project);
  assert.equal(shared.coverImage, "/shared.mp4");
  assert.deepEqual(shared.gallery, ["/one.gif"]);
  assert.deepEqual(shared.categories, ["mobile"]);
  const custom = localizeProject({
    ...project,
    en: {
      ...project.en,
      coverImage: "/english.gif",
      gallery: ["/en-one.mp4", null],
    },
  });
  assert.equal(custom.coverImage, "/english.gif");
  assert.deepEqual(custom.gallery, ["/en-one.mp4"]);
  assert.deepEqual(project.gallery, ["/one.gif"]);
});
test("article sections retain order and media but cannot publish incomplete translations", () => {
  const article = {
    englishReady: true,
    en: { title: "Writing", category: "UX" },
    cover: "/cover.gif",
    sections: [
      {
        _key: "a",
        title: "عنوان",
        text: "عربي",
        media: "/image.png",
        en: { title: "Section", text: "Copy", extraText: "More" },
      },
    ],
  };
  const result = localizeArticle(article);
  assert.equal(result.sections[0].title, "Section");
  assert.equal(result.sections[0].extraText, "More");
  assert.equal(result.sections[0]._key, "a");
  assert.equal(result.sections[0].media, "/image.png");
  assert.equal(
    localizeArticle({
      ...article,
      sections: [{ en: { title: "Missing body" } }],
    }),
    null,
  );
  assert.equal(localizeArticle({ ...article, sections: [] }), null);
  assert.ok(
    localizeArticle({
      ...article,
      sections: [],
      en: { ...article.en, body: "Legacy English article" },
    }),
  );
});
test("switching language preserves pages and safely handles untranslated detail pages", () => {
  assert.equal(localePath("/#services", "en"), "/en#services");
  assert.equal(languageTarget("/"), "/en");
  assert.equal(languageTarget("/en"), "/");
  assert.equal(languageTarget("/resume"), "/en/resume");
  assert.equal(languageTarget("/projects/sample"), "/en/projects");
  assert.equal(
    languageTarget("/projects/sample", ["/en/projects/sample"]),
    "/en/projects/sample",
  );
  assert.equal(languageTarget("/articles/sample"), "/en/articles");
  assert.equal(languageTarget("/en/articles/sample"), "/articles/sample");
});
test("CMS retains original fields and exposes matching bilingual groups and nested sections", () => {
  const p = localizedSchema(projectSchema),
    a = localizedSchema(articleSchema);
  for (const original of projectSchema.fields)
    assert.ok(p.fields.some((f) => f.name === original.name));
  assert.equal(p.fields.find((f) => f.name === "mainTitle").group, "ar");
  const english = p.fields.find((f) => f.name === "en");
  assert.ok(english.fields.some((f) => f.name === "gallery"));
  assert.ok(english.fields.some((f) => f.name === "coverImageMedia"));
  const section = a.fields.find((f) => f.name === "sections").of[0];
  assert.equal(section.fields.find((f) => f.name === "media").group, "shared");
  assert.ok(
    section.fields
      .find((f) => f.name === "en")
      .fields.some((f) => f.name === "media"),
  );
  let validate;
  p.fields
    .find((f) => f.name === "englishReady")
    .validation({
      custom: (fn) => {
        validate = fn;
      },
    });
  assert.equal(validate(false, { document: {} }), true);
  assert.notEqual(validate(true, { document: {} }), true);
  assert.equal(validate(true, { document: project }), true);
});
