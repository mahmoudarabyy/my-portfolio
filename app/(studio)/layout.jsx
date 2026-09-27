export const metadata = {
  title: "إدارة المشاريع — محمود عربي",
  robots: { index: false, follow: false },
};
export default function StudioLayout({ children }) {
  return (
    <html lang="ar">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
