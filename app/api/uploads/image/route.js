// Route proxy Next.js pour uploader une image
export async function POST(request) {
  const formData = await request.formData();
  const token = request.headers.get("authorization");
  const response = await fetch("http://localhost:3000/api/uploads/image", {
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