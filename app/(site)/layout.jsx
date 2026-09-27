import { InterfaceProvider } from "../../components/interactions";
import Footer from "../../components/Footer";
import { siteName, siteDescription, siteUrl } from "../../lib/site";
import "./globals.css";
import "./migration.css";
import "./theme.css";
import "./refinements.css";
import { themeBootstrap } from "../../lib/theme.mjs";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | UX/UI Designer`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: { icon: "/Logo.png" },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image" },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040404",
};
export default function SiteLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <InterfaceProvider>
          {children}
          <Footer />
        </InterfaceProvider>
      </body>
    </html>
  );
}
