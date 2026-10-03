import {
  englishContentImport,
  englishResumeImport,
} from "./english-content-import.mjs";

function sourceMatches(doc, source) {
  return Object.entries(source).every(([key, value]) =>
    Array.isArray(value)
      ? doc[key]?.length === value.length &&
        value.every((item) => {
          const actual = doc[key].find((i) => i._key === item._key);
          return (
            actual &&
            Object.entries(item).every(
              ([field, text]) => (actual[field] || "") === text,
            )
          );
        })
      : (doc[key] || "") === value,
  );
}
export function buildEnglishImportPlan(documents) {
  const patches = [],
    skippedDrafts = [];
  for (const item of englishContentImport) {
    const published = documents.find((d) => d._id === item.id);
    if (!published || !sourceMatches(published, item.source))
      throw new Error(
        "المحتوى العربي اتغير؛ راجع الترجمة قبل النشر: " + item.id,
      );
    for (const doc of [
      published,
      documents.find((d) => d._id === "drafts." + item.id),
    ].filter(Boolean)) {
      if (!sourceMatches(doc, item.source)) {
        skippedDrafts.push(doc._id);
        continue;
      }
      // Merge text only; preserve any optional English media already uploaded.
      const set = {
        en: { ...item.en, ...doc.en },
        englishReady: doc.englishReady ?? true,
      };
      for (const [list, items] of Object.entries(item.lists))
        for (const entry of items) {
          const current = doc[list].find((i) => i._key === entry._key);
          set[`${list}[_key==${JSON.stringify(entry._key)}].en`] = {
            ...entry.en,
            ...current.en,
          };
        }
      patches.push({ id: doc._id, ifRevisionID: doc._rev, set });
    }
  }
  const existingResume = documents.find((d) => d._id === "resume-content");
  const resumeSource = Object.fromEntries(
    ["experiences", "highlights"].map((list) => [
      list,
      englishResumeImport[list].map(({ en, ...item }) => item),
    ]),
  );
  for (const doc of documents.filter((d) =>
    ["resume-content", "drafts.resume-content"].includes(d._id),
  )) {
    if (!sourceMatches(doc, resumeSource)) {
      if (doc._id === "resume-content")
        throw new Error("محتوى السيرة اتغير؛ يلزم تحديث الترجمة.");
      skippedDrafts.push(doc._id);
      continue;
    }
    const set = { englishReady: doc.englishReady ?? true };
    for (const list of ["experiences", "highlights"])
      for (const item of englishResumeImport[list])
        set[`${list}[_key==${JSON.stringify(item._key)}].en`] = {
          ...item.en,
          ...doc[list].find((i) => i._key === item._key)?.en,
        };
    patches.push({ id: doc._id, ifRevisionID: doc._rev, set });
  }
  return {
    patches,
    create: existingResume ? [] : [englishResumeImport],
    skippedDrafts,
    publishedCount: englishContentImport.length + 1,
  };
}
