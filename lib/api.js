// URL de base de l’API backend Express
const API_URL = "http://localhost:3000/api";
// Fonction qui récupère la liste des logements depuis le backend
export async function getProperties() {
  // Appel de la route GET /api/properties
  const response = await fetch(`${API_URL}/properties`);
  // Si la réponse n’est pas correcte, on bloque avec une erreur
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des logements");
  }
  // On transforme la réponse JSON en données JavaScript
  return response.json();
}