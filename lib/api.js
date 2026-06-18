import {
  API_URL,
  BACKEND_URL,
} from "./config";

/**
 * Normalise une URL d’image renvoyée par le backend.
 * Transforme les chemins `/uploads/...` en URL absolue utilisable côté frontend.
 * @param {string} imageUrl
 * @returns {string}
 */
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

/**
 * Normalise toutes les images d’un logement avant affichage.
 * @param {Object} property
 * @returns {Object}
 */
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

/** Récupère tous les logements puis normalise leurs images. */
export async function getProperties() {
  const response = await fetch(`${API_URL}/properties`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des logements");
  }
  const properties = await response.json();
  return properties.map(normalizePropertyImages);
}

/**
 * Récupère un logement par identifiant.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getPropertyById(id) {
  const response = await fetch(`${API_URL}/properties/${id}`);
  if (!response.ok) {
    throw new Error("Logement introuvable");
  }
  const property = await response.json();
  return normalizePropertyImages(property);
}

/**
 * Upload une image via la route proxy Next.js.
 * Le token d’authentification est lu depuis localStorage.
 * @param {File} file
 * @param {string} purpose
 * @returns {Promise<Object>}
 */
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

/**
 * Crée un logement via l’API applicative.
 * @param {Object} propertyData
 * @returns {Promise<Object>}
 */
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
