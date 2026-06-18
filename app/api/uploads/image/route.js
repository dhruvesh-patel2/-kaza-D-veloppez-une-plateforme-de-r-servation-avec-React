import { API_URL } from "../../../../lib/config";

// Route proxy Next.js pour uploader une image
export async function POST(request) {
  const formData = await request.formData();
  const token = request.headers.get("authorization");
  const response = await fetch(`${API_URL}/uploads/image`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });
  const data = await response.json();
  return Response.json(data, {
    status: response.status,
  });
}
