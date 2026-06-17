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