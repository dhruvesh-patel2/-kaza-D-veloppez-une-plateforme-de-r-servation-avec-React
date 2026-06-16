const API_URL = "http://localhost:3000/api";

export async function getProperties() {
  const response = await fetch(`${API_URL}/properties`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des logements");
  }

  return response.json();
}

export async function getPropertyById(id) {
  const response = await fetch(`${API_URL}/properties/${id}`);

  if (!response.ok) {
    throw new Error("Logement introuvable");
  }

  return response.json();
}