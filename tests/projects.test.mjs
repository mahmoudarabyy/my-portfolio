import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { localProjects } from "../lib/local-projects.mjs";
import {
  filterProjects,
  groupProjects,
  normalizeProjects,
  getFeaturedProjects,
  toProjectCard,
} from "../lib/project-data.mjs";

test("all current projects and case-study images survive migration", () => {
  assert.equal(localProjects.length, 10);
  for (const project of localProjects) {
    assert.ok(project.mainTitle);
    for (const src of [
      project.cardImage,
      project.icon,
      project.coverImage,
      project.aboutImg,
      project.researchImg,
      project.problemImg,
      project.solutionImg,
      ...project.gallery,
    ].filter(Boolean)) {
      assert.ok(
        existsSync(fileURLToPath(new URL("../public" + src, import.meta.url))),
        `${project.id}: missing ${src}`,
      );
    }
  }
});
test("government filtering compacts rows without leaving gaps", () => {
  const filtered = filterProjects(localProjects, "gov");
  assert.deepEqual(
    filtered.map((p) => p.id),
    ["prosecution", "engineers", "sehati"],
  );
  const rows = groupProjects(filtered);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].length, 3);
});
test("categories use exact membership and empty results remain empty", () => {
  assert.deepEqual(filterProjects(localProjects, "gov-extra"), []);
  assert.deepEqual(normalizeProjects([]), []);
  assert.deepEqual(groupProjects([]), []);
});
test("invalid and duplicate slugs cannot become project routes", () => {
  assert.throws(() => normalizeProjects([{ id: "../secret" }]));
  assert.throws(() => normalizeProjects([{ id: "same" }, { id: "same" }]));
  assert.throws(() => normalizeProjects(null));
});
test("published CMS projects use title/image fallbacks and sort order", () => {
  const projects = normalizeProjects([
    { slug: { current: "new-project" }, mainTitle: "مشروع جديد", sortOrder: 2 },
    { id: "first", title: "الأول", sortOrder: 1, featured: true },
  ]);
  assert.deepEqual(
    projects.map((p) => p.id),
    ["first", "new-project"],
  );
  assert.equal(projects[1].cardTitle, "مشروع جديد");
  assert.equal(projects[1].coverImage, "/project-placeholder.svg");
  assert.equal(getFeaturedProjects(projects)[0].id, "first");
});
test("filter payload excludes full case-study content", () => {
  const card = toProjectCard(localProjects[0]);
  assert.ok(card.cardTitle);
  assert.ok(card.categories);
  assert.equal("researchLead" in card, false);
  assert.equal("gallery" in card, false);
});

test("project icons survive card serialization and remain optional", () => {
  const apply = localProjects.find((project) => project.id === "applyseo");
  assert.equal(toProjectCard(apply).icon, "/project-icons/applyseo.png");
  const [cms] = normalizeProjects([
    {
      id: "cms-project",
      icon: "https://cdn.sanity.io/images/example/production/icon-128x128.png",
    },
  ]);
  assert.equal(toProjectCard(cms).icon, cms.icon);
  assert.equal(
    toProjectCard(normalizeProjects([{ id: "no-icon" }])[0]).icon,
    undefined,
  );
});
