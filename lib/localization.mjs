export const projectTextFields = [
  "mainTitle",
  "cardTitle",
  "cardDescription",
  "summary",
  "client",
  "role",
  "timeline",
  "field",
  "researchLead",
  "researchExtra",
  "problemLead",
  "problemExtra",
  "solutionLead",
  "solutionExtra",
  "caseHeadline",
  "requirements",
  "requirementsExtra",
  "workingModel",
  "productTitle",
  "productBody",
  "websiteTitle",
  "websiteBody",
  "resultTitle",
  "resultBody",
];
export const articleTextFields = [
  "title",
  "category",
  "excerpt",
  "body",
  "buttonLabel",
];
export function hasEnglish(doc, required) {
  return (
    doc?.englishReady === true &&
    required.every(
      (key) => typeof doc.en?.[key] === "string" && doc.en[key].trim(),
    )
  );
}
export function translateRecord(doc, fields) {
  const result = { ...doc };
  for (const key of fields)
    result[key] = typeof doc.en?.[key] === "string" ? doc.en[key] : "";
  return result;
}
export function translateItems(items, fields) {
  return (items || []).map((item) => translateRecord(item, fields));
}
export function localizeProject(doc) {
  if (!hasEnglish(doc, ["mainTitle", "cardDescription", "summary"]))
    return null;
  const result = translateRecord(doc, projectTextFields);
  for (const key of [
    "icon",
    "cardImage",
    "coverImage",
    "aboutImg",
    "researchImg",
    "researchSecondImg",
    "problemImg",
    "solutionImg",
    "requirementsImg",
    "resultImg",
  ])
    if (doc.en?.[key]) result[key] = doc.en[key];
  if (doc.en?.gallery?.filter(Boolean).length)
    result.gallery = doc.en.gallery.filter(Boolean);
  result.awards = translateItems(doc.awards, ["title", "description"]).filter(
    (a) => a.title,
  );
  result.cardTitle ||= result.mainTitle;
  return result;
}
export function localizeArticle(doc) {
  if (!hasEnglish(doc, ["title", "category"])) return null;
  const sections = translateItems(doc.sections, [
    "title",
    "text",
    "extraText",
    "mediaAlt",
  ]);
  if (
    sections.some((s) => !s.title.trim() || !s.text.trim()) ||
    (!sections.length && !doc.en?.body?.trim())
  )
    return null;
  return {
    ...translateRecord(doc, articleTextFields),
    cover: doc.en?.cover || doc.cover,
    sections: sections.map((s, i) => ({
      ...s,
      media: doc.sections[i].en?.media || s.media,
    })),
  };
}
export function localePath(path, lang = "ar") {
  return lang === "en"
    ? "/en" + (path === "/" ? "" : path.startsWith("/#") ? path.slice(1) : path)
    : path;
}
export function languageTarget(pathname, available = []) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  const target = localePath(pathname, "en");
  if (
    /^\/(projects|articles)\/[^/]+$/.test(pathname) &&
    !available.includes(target)
  )
    return pathname.startsWith("/projects/") ? "/en/projects" : "/en/articles";
  return target;
}
