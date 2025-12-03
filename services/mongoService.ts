const API_URL = "https://crud2db.onrender.com";

export async function mongoGetAll() {
  const res = await fetch(`${API_URL}/dishes`);
  return res.json();
}

export async function mongoCreate(data: any) {
  const res = await fetch(`${API_URL}/dishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function mongoDelete(id: string) {
  const res = await fetch(`${API_URL}/dishes/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
