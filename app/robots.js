// URL du frontend
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://kaza-d-veloppez-une-plateforme-de-r-seven.vercel.app";
// Configuration robots.txt
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Lien du sitemap XML
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}