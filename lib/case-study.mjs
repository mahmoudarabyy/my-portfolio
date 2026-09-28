export function getCaseStudy(project) {
  const unique = (values) => [
    ...new Set(values.filter((value) => typeof value === "string" && value)),
  ];
  const images = unique([
    ...(project.gallery || []),
    project.aboutImg,
    project.researchImg,
    project.problemImg,
    project.solutionImg,
    project.resultImg,
    project.requirementsImg,
  ]);
  return {
    headline:
      project.caseHeadline || project.role || "تصميم تجربة وواجهة المستخدم",
    requirements: project.requirements || project.researchExtra,
    workingModel: project.workingModel,
    productTitle: project.productTitle || "تجربة أبسط، وخطوات أوضح",
    productBody: project.productBody || project.solutionLead,
    websiteTitle: project.websiteTitle || "الواجهات والتفاصيل البصرية",
    websiteBody: project.websiteBody || project.cardDescription,
    resultTitle: project.resultTitle || "التصميم النهائي",
    resultBody:
      project.resultBody || project.solutionExtra || project.solutionLead,
    awards: (project.awards || []).filter((item) => item?.title),
    websiteUrl: /^https?:\/\//i.test(project.websiteUrl || "")
      ? project.websiteUrl
      : null,
    images: images.length ? images : [project.coverImage],
  };
}
