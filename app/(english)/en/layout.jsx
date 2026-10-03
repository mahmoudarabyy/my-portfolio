import { getEnglishPaths } from "../../../lib/english-paths";
import { InterfaceProvider } from "../../../components/interactions";
import Footer from "../../../components/Footer";
import { siteName, siteDescription, siteUrl } from "../../../lib/site";
import "../../(site)/globals.css";
import "../../(site)/migration.css";
import "../../(site)/theme.css";
import "../../(site)/refinements.css";
import "../../(site)/localization.css";
import { themeBootstrap } from "../../../lib/theme.mjs";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mahmoud Araby | UX/UI Designer",
    template: "%s | Mahmoud Araby",
  },
  description: "UX/UI designer creating clear, thoughtful digital experiences.",
  icons: { icon: "/Logo.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mahmoud Araby",
    title: "Mahmoud Araby",
    description:
      "UX/UI designer creating clear, thoughtful digital experiences.",
  },
  twitter: { card: "summary_large_image" },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040404",
};
export default async function SiteLayout({ children }) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <InterfaceProvider lang="en" englishPaths={await getEnglishPaths()}>
          {children}
          <Footer lang="en" />
        </InterfaceProvider>
      </body>
    </html>
  );
}
