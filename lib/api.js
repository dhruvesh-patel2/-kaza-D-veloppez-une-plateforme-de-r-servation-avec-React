const API_URL = "http://localhost:3000/api";
const BACKEND_URL = "http://localhost:3000";
// Corrige les URLs d’images venant du backend
function normalizeImageUrl(imageUrl) {
  if (!imageUrl) {
    return "";
  }
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }
  if (imageUrl.startsWith("/uploads")) {
    return `${BACKEND_URL}${imageUrl}`;
  }
  return imageUrl;
}
// Corrige les images d’un logement
function normalizePropertyImages(property) {
  return {
    ...property,
    cover: normalizeImageUrl(property.cover),
    pictures: property.pictures?.map(normalizeImageUrl) || [],
    host: {
      ...property.host,
      picture: normalizeImageUrl(property.host?.picture),
    },
  };
}
// Récupération de tous les logements
export async function getProperties() {
  const response = await fetch(`${API_URL}/properties`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des logements");
  }
  const properties = await response.json();
  return properties.map(normalizePropertyImages);
}
// Récupération d’un logement par id
export async function getPropertyById(id) {
  const response = await fetch(`${API_URL}/properties/${id}`);
  if (!response.ok) {
    throw new Error("Logement introuvable");
  }
  const property = await response.json();
  return normalizePropertyImages(property);
}
// Upload d’une image via l’API
export async function uploadImage(file, purpose) {
  const token = localStorage.getItem("kasa_token");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("purpose", purpose);
  const response = await fetch("/api/uploads/image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Erreur lors de l’upload de l’image");
  }
  return data;
}
// Création d’une propriété
export async function createProperty(propertyData) {
  const token = localStorage.getItem("kasa_token");
  const response = await fetch("/api/properties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Erreur lors de la création du logement");
  }
  return data;
}