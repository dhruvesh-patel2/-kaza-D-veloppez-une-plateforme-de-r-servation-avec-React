// Configuration robots SEO
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "http://localhost:3001/sitemap.xml",
  };
}