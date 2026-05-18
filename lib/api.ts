const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Erro desconhecido" }));
    if (Array.isArray(error)) {
      throw new Error(error.map((e: { description?: string; message?: string }) => e.description ?? e.message).filter(Boolean).join(" ") || "Erro na requisição");
    }
    throw new Error(error.message ?? error.title ?? "Erro na requisição");
  }

  return res.json();
}
