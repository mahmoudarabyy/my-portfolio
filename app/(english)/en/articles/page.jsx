import Page from "../../../(site)/articles/page";
export const revalidate = 60;
export const metadata = {
  title: "Writing",
  alternates: {
    canonical: "/en/articles",
    languages: { ar: "/articles", en: "/en/articles" },
  },
};
export default function EnglishPage() {
  return <Page lang="en" />;
}
