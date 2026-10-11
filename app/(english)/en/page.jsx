import { socialMetadata } from "../../../lib/site";
import Page from "../../(site)/page";
export const revalidate = 60;
export const metadata = {
  openGraph: { ...socialMetadata("en").openGraph, url: "/en" },
  title: "Mahmoud Araby | UX/UI Designer",
  alternates: { canonical: "/en", languages: { ar: "/", en: "/en" } },
};
export default function EnglishPage() {
  return <Page lang="en" />;
}
