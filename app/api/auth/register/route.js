// Route proxy Next.js pour éviter les erreurs CORS
export async function POST(request) {
  // Récupération des données envoyées par le formulaire
  const body = await request.json();
  // Envoi de la requête vers le backend Express
  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  // Récupération de la réponse du backend
  const data = await response.json();
  // Retour de la réponse au frontend
  return Response.json(data, {
    status: response.status,
  });
}