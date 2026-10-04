import { ui } from "./ui.js";
export function getCaseStudy(project, lang = "ar") {
  const unique = (values) => [
    ...new Set(values.filter((value) => typeof value === "string" && value)),
  ];
  const images = unique([
    ...(project.gallery || []),
    project.aboutImg,
    project.researchSecondImg,
    project.aboutSecondImg,
    project.solutionFullImg,
    project.workingImg,
    project.workingSecondImg,
    project.resultSecondImg,
    project.resultFullImg,
    project.researchImg,
    project.problemImg,
    project.solutionImg,
    project.resultImg,
    project.requirementsImg,
  ]);
  return {
    headline:
      project.caseHeadline ||
      project.role ||
      ui(lang, "تصميم تجربة وواجهة المستخدم"),
    requirements: project.requirements || project.researchExtra,
    workingModel: project.workingModel,
    productTitle:
      project.productTitle ||
      (lang === "en" ? "A simpler experience" : "تجربة أبسط، وخطوات أوضح"),
    productBody: project.productBody || project.solutionLead,
    websiteTitle:
      project.websiteTitle ||
      (lang === "en"
        ? "Interface and visual details"
        : "الواجهات والتفاصيل البصرية"),
    websiteBody: project.websiteBody || project.cardDescription,
    resultTitle: project.resultTitle || ui(lang, "التصميم النهائي"),
    resultBody:
      project.resultBody || project.solutionExtra || project.solutionLead,
    awards: (project.awards || []).filter((item) => item?.title),
    websiteUrl: /^https?:\/\//i.test(project.websiteUrl || "")
      ? project.websiteUrl
      : null,
    images: images.length ? images : [project.coverImage],
  };
}
