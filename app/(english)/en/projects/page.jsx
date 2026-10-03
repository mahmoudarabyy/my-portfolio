import Page from "../../../(site)/projects/page";
export const revalidate = 60;
export const metadata = {
  title: "Projects",
  alternates: {
    canonical: "/en/projects",
    languages: { ar: "/projects", en: "/en/projects" },
  },
};
export default function EnglishPage() {
  return <Page lang="en" />;
}
