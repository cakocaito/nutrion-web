import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { apiFetch } from "@/lib/api";

const fetchMock = vi.fn();

beforeEach(() => {
  localStorage.clear();
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function ok(body: unknown) {
  return { ok: true, json: async () => body };
}

function err(status: number, body: unknown) {
  return {
    ok: false,
    status,
    json: async () => body,
  };
}

describe("apiFetch — sucesso", () => {
  it("retorna o JSON do corpo em respostas 2xx", async () => {
    fetchMock.mockResolvedValue(ok({ id: 1, nome: "ok" }));
    const data = await apiFetch("/api/foo");
    expect(data).toEqual({ id: 1, nome: "ok" });
  });

  it("envia Content-Type: application/json por padrão", async () => {
    fetchMock.mockResolvedValue(ok({}));
    await apiFetch("/api/foo");
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers["Content-Type"]).toBe("application/json");
  });

  it("não envia Authorization quando não há token no localStorage", async () => {
    fetchMock.mockResolvedValue(ok({}));
    await apiFetch("/api/foo");
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers.Authorization).toBeUndefined();
  });

  it("envia Authorization: Bearer <token> quando há token", async () => {
    localStorage.setItem("token", "jwt-abc");
    fetchMock.mockResolvedValue(ok({}));
    await apiFetch("/api/foo");
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers.Authorization).toBe("Bearer jwt-abc");
  });

  it("permite override de headers via options", async () => {
    fetchMock.mockResolvedValue(ok({}));
    await apiFetch("/api/foo", { headers: { "X-Custom": "1" } });
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers["X-Custom"]).toBe("1");
    expect(init.headers["Content-Type"]).toBe("application/json");
  });

  it("propaga method e body para o fetch", async () => {
    fetchMock.mockResolvedValue(ok({}));
    await apiFetch("/api/foo", {
      method: "POST",
      body: JSON.stringify({ a: 1 }),
    });
    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ a: 1 }));
  });
});

describe("apiFetch — erro", () => {
  it("lança Error com .message quando backend devolve objeto com message", async () => {
    fetchMock.mockResolvedValue(err(400, { message: "Algo deu errado." }));
    await expect(apiFetch("/api/foo")).rejects.toThrow("Algo deu errado.");
  });

  it("usa .title como fallback quando não há message", async () => {
    fetchMock.mockResolvedValue(err(400, { title: "Bad Request" }));
    await expect(apiFetch("/api/foo")).rejects.toThrow("Bad Request");
  });

  it("junta descrições quando backend devolve array (erros de validação .NET)", async () => {
    fetchMock.mockResolvedValue(
      err(400, [
        { description: "E-mail é obrigatório." },
        { description: "Senha inválida." },
      ]),
    );
    await expect(apiFetch("/api/foo")).rejects.toThrow(
      "E-mail é obrigatório. Senha inválida.",
    );
  });

  it("array com message no lugar de description também é considerado", async () => {
    fetchMock.mockResolvedValue(
      err(400, [{ message: "x" }, { description: "y" }]),
    );
    await expect(apiFetch("/api/foo")).rejects.toThrow("x y");
  });

  it("array vazio cai no fallback genérico", async () => {
    fetchMock.mockResolvedValue(err(400, []));
    await expect(apiFetch("/api/foo")).rejects.toThrow("Erro na requisição");
  });

  it("body JSON quebrado vira 'Erro desconhecido'", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error("invalid json");
      },
    });
    await expect(apiFetch("/api/foo")).rejects.toThrow("Erro desconhecido");
  });
});
