import { describe, it, expect } from "vitest";
import type { NextRequest } from "next/server";
import { middleware } from "@/middleware";

function makeRequest(pathname: string, token?: string): NextRequest {
  const url = `http://localhost${pathname}`;
  return {
    url,
    nextUrl: { pathname },
    cookies: {
      get: (name: string) =>
        name === "token" && token ? { name, value: token } : undefined,
    },
  } as unknown as NextRequest;
}

const publicRoutes = [
  "/",
  "/login",
  "/sobre",
  "/cadastro",
  "/cadastro/consultor",
  "/cadastro/responsavel",
  "/redefinir-senha",
];

const privateRoutes = [
  "/home",
  "/avaliacoes",
  "/projeto/consultor",
  "/projeto/responsavel",
  "/relatorio/123",
  "/perfil",
  "/redcap",
];

describe("middleware — rota pública", () => {
  it.each(publicRoutes)("permite %s sem token", (path) => {
    const res = middleware(makeRequest(path));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it.each(publicRoutes)("permite %s com token", (path) => {
    const res = middleware(makeRequest(path, "abc"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });
});

describe("middleware — rota privada", () => {
  it.each(privateRoutes)("redireciona %s para /login quando não há token", (path) => {
    const res = middleware(makeRequest(path));
    expect([307, 308]).toContain(res.status);
    const location = res.headers.get("location") ?? "";
    expect(location).toContain("/login");
  });

  it.each(privateRoutes)("permite %s quando há token", (path) => {
    const res = middleware(makeRequest(path, "jwt-token"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });
});

describe("middleware — borda", () => {
  it("token vazio é tratado como ausente (redireciona)", () => {
    const res = middleware(makeRequest("/home", ""));
    expect([307, 308]).toContain(res.status);
  });

  it("subrotas de cadastro que não estão na lista são tratadas como privadas", () => {
    // /cadastro/responsavel está liberada, mas /cadastro/outra-coisa não
    const res = middleware(makeRequest("/cadastro/outra-coisa"));
    expect([307, 308]).toContain(res.status);
  });
});
