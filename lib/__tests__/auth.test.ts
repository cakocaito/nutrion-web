import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  login,
  logout,
  getUser,
  isAuthenticated,
  type AuthUser,
} from "@/lib/auth";

const fakeUser: AuthUser = {
  token: "jwt-fake-token",
  email: "caio@uff.br",
  nomeCompleto: "Caio Silva",
  role: "Consultor",
  expiration: "2030-01-01T00:00:00Z",
  empresaId: null,
};

function clearCookies() {
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter(Boolean)
    .forEach((name) => {
      document.cookie = `${name}=; path=/; max-age=0`;
    });
}

beforeEach(() => {
  localStorage.clear();
  clearCookies();
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("login", () => {
  it("chama o backend, salva token + user no localStorage e seta cookie", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => fakeUser,
    });
    vi.stubGlobal("fetch", fetchSpy);

    const result = await login("caio@uff.br", "senha1234");

    expect(result).toEqual(fakeUser);
    expect(localStorage.getItem("token")).toBe(fakeUser.token);
    expect(localStorage.getItem("user")).toBe(JSON.stringify(fakeUser));
    expect(document.cookie).toContain(`token=${fakeUser.token}`);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [, init] = fetchSpy.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.body).toBe(
      JSON.stringify({ email: "caio@uff.br", password: "senha1234" }),
    );
  });

  it("propaga erro quando backend devolve não-2xx", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Credenciais inválidas." }),
    });
    vi.stubGlobal("fetch", fetchSpy);

    await expect(login("x@x.com", "12345678")).rejects.toThrow(
      "Credenciais inválidas.",
    );
    expect(localStorage.getItem("token")).toBeNull();
  });
});

describe("logout", () => {
  it("limpa token, user e expira o cookie", () => {
    localStorage.setItem("token", "abc");
    localStorage.setItem("user", JSON.stringify(fakeUser));
    document.cookie = "token=abc; path=/";

    logout();

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
    expect(document.cookie).not.toContain("token=abc");
  });
});

describe("getUser", () => {
  it("retorna null quando localStorage está vazio", () => {
    expect(getUser()).toBeNull();
  });

  it("retorna o user parseado quando presente", () => {
    localStorage.setItem("user", JSON.stringify(fakeUser));
    expect(getUser()).toEqual(fakeUser);
  });
});

describe("isAuthenticated", () => {
  it("é false quando não há user no localStorage", () => {
    expect(isAuthenticated()).toBe(false);
  });

  it("é true quando há user no localStorage", () => {
    localStorage.setItem("user", JSON.stringify(fakeUser));
    expect(isAuthenticated()).toBe(true);
  });
});
