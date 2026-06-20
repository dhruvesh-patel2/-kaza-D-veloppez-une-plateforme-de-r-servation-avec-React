// Import API backend
import { API_URL } from "../lib/config";
// URL du frontend
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://kaza-d-veloppez-une-plateforme-de-r-seven.vercel.app";
// Génération du sitemap
export default async function sitemap() {
  // Pages statiques
  const staticUrls = [
    "",
    "/about",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  try {
    // Récupération des logements
    const response = await fetch(`${API_URL}/properties`, {
      next: { revalidate: 3600 },
    });
    // Vérifie la réponse API
    if (!response.ok) {
      throw new Error("Erreur API properties");
    }
    // Conversion JSON
    const data = await response.json();
    // Compatibilité format API
    const properties = data.properties || data;
    // Sécurité si pas tableau
    if (!Array.isArray(properties)) {
      return staticUrls;
    }
    // Génération URLs dynamiques
    const dynamicUrls = properties.map((property) => ({
      url: `${SITE_URL}/properties/${property.id}`,
      // Date SEO
      lastModified: new Date(
        property.updatedAt ||
          property.updated_at ||
          property.createdAt ||
          property.created_at ||
          Date.now()
      ),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    // Retour sitemap complet
    return [...staticUrls, ...dynamicUrls];
  } catch (error) {
    // Affiche erreur Vercel
    console.error("Erreur sitemap:", error);
    // Retour fallback
    return staticUrls;
  }
}