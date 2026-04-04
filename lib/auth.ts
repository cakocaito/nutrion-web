import { apiFetch } from "./api";

export interface AuthUser {
  token: string;
  email: string;
  nomeCompleto: string;
  role: string;
  expiration: string;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data));
  document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 8}`;
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  document.cookie = "token=; path=/; max-age=0";
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated(): boolean {
  return !!getUser();
}
