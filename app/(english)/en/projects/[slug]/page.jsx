import Page, {
  generateMetadata as detailsMetadata,
} from "../../../../(site)/projects/[slug]/page";
export const revalidate = 60;
export async function generateMetadata({ params }) {
  return detailsMetadata({ params, lang: "en" });
}
export default function EnglishDetails({ params }) {
  return <Page params={params} lang="en" />;
}
