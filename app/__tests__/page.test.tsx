import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import LandingPage from "@/app/page";

let currentUser: unknown = null;

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ user: currentUser }),
}));

beforeEach(() => {
  currentUser = null;
});

describe("LandingPage — render", () => {
  it("renderiza título, parágrafo descritivo e botões principais", () => {
    render(<LandingPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/NutriSec é um sistema digital/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^começar$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /responder pesquisa/i })).toBeInTheDocument();
  });
});

describe("LandingPage — botão Começar", () => {
  it("aponta para /login quando não há user", () => {
    currentUser = null;
    render(<LandingPage />);
    const link = screen.getByRole("link", { name: /^começar$/i });
    expect(link).toHaveAttribute("href", "/login");
  });

  it("aponta para /home quando há user", () => {
    currentUser = {
      token: "t",
      email: "x",
      nomeCompleto: "X Y",
      role: "Consultor",
      expiration: "",
      empresaId: null,
    };
    render(<LandingPage />);
    const link = screen.getByRole("link", { name: /^começar$/i });
    expect(link).toHaveAttribute("href", "/home");
  });
});

describe("LandingPage — link Sobre no cabeçalho", () => {
  it("aponta para /sobre", () => {
    render(<LandingPage />);
    const link = screen.getByRole("link", { name: /^sobre$/i });
    expect(link).toHaveAttribute("href", "/sobre");
  });
});

describe("LandingPage — Responder Pesquisa", () => {
  it("abre o RedCap em nova aba com rel correto", () => {
    render(<LandingPage />);
    const link = screen.getByRole("link", { name: /responder pesquisa/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute(
      "href",
      "https://redcap.uff.br/redcap/surveys/?s=TPJ4PMEMDL7AA98X",
    );
  });
});
