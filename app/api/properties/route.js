import { API_URL } from "../../../lib/config";

// Route proxy Next.js pour créer une propriété sans problème CORS
export async function POST(request) {
  const body = await request.json();
  const token = request.headers.get("authorization");
  const response = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return Response.json(data, {
    status: response.status,
  });
}
