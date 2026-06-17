// Fonction qui connecte un utilisateur
export async function loginUser({
  email,
  password,
}) {
  // Appel vers la route proxy Next.js
  // Cette route évite les problèmes CORS avec le backend
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  // Conversion de la réponse en JSON
  const data = await response.json();
  // Gestion des erreurs API
  if (!response.ok) {
    throw new Error(
      data.error || "Identifiants invalides"
    );
  }
  // Retourne le token et les informations utilisateur
  return data;
}
// Fonction qui inscrit un utilisateur
export async function registerUser({
  name,
  email,
  password,
  role = "client",
}) {
  // Appel vers la route proxy Next.js
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role,
    }),
  });
  // Conversion de la réponse en JSON
  const data = await response.json();
  // Gestion des erreurs API
  if (!response.ok) {
    throw new Error(
      data.error || "Erreur lors de l'inscription"
    );
  }
  // Retourne le token et l’utilisateur
  return data;
}