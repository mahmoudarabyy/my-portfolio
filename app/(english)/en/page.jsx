import Page from "../../(site)/page";
export const revalidate = 60;
export const metadata = {
  title: "Mahmoud Araby | UX/UI Designer",
  alternates: { canonical: "/en", languages: { ar: "/", en: "/en" } },
};
export default function EnglishPage() {
  return <Page lang="en" />;
}
