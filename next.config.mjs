/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
      {
        source: "/project-details.html",
        has: [{ type: "query", key: "id", value: "(?<slug>[a-zA-Z0-9_-]+)" }],
        destination: "/projects/:slug",
        permanent: true,
      },
      {
        source: "/project-details.html",
        has: [
          { type: "query", key: "project", value: "(?<slug>[a-zA-Z0-9_-]+)" },
        ],
        destination: "/projects/:slug",
        permanent: true,
      },
      {
        source: "/project-details.html",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
