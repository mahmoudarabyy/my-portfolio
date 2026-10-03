import Page from "../../../(site)/resume/page";
export const revalidate = 60;
export const metadata = {
  title: "Resume",
  alternates: {
    canonical: "/en/resume",
    languages: { ar: "/resume", en: "/en/resume" },
  },
};
export default function EnglishPage() {
  return <Page lang="en" />;
}
