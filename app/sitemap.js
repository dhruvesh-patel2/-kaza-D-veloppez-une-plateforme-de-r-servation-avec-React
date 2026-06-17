// URL du site
const BASE_URL = "http://localhost:3001";
// Sitemap du site
export default function sitemap() {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/favorites`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/messages`,
      lastModified: new Date(),
    },
  ];
}