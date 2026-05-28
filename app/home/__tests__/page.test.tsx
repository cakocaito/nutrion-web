import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "@/app/home/page";

const pushMock = vi.fn();
const apiFetchMock = vi.fn();
let currentUser: { role?: string; nomeCompleto?: string } | null = null;

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ user: currentUser }),
}));

vi.mock("@/lib/api", () => ({
  apiFetch: (...args: unknown[]) => apiFetchMock(...args),
}));

vi.mock("@/app/projeto/components", () => ({
  Sidebar: ({ role }: { role: string }) => (
    <aside data-testid="sidebar" data-role={role} />
  ),
  MobileSidebar: ({ role }: { role: string }) => (
    <aside data-testid="mobile-sidebar" data-role={role} />
  ),
  TopBar: ({ role }: { role: string }) => (
    <div data-testid="topbar" data-role={role} />
  ),
}));

beforeEach(() => {
  pushMock.mockReset();
  apiFetchMock.mockReset();
  apiFetchMock.mockResolvedValue([]);
  currentUser = null;
});

describe("HomePage — saudação", () => {
  it("usa o primeiro nome do user", async () => {
    currentUser = { nomeCompleto: "Caio Marcio Silva", role: "Consultor" };
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^olá, caio/i);
  });

  it("fallback 'Consultor' quando user é null", () => {
    currentUser = null;
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/consultor/i);
  });

  it("fallback 'Responsável' quando user é null mas role indicaria responsavel", () => {
    // este caso simula um estado de carregamento onde nomeCompleto não veio mas role sim
    currentUser = { role: "Responsavel" };
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/responsável/i);
  });
});

describe("HomePage — role-aware", () => {
  it("Sidebar recebe role=consultor", () => {
    currentUser = { role: "Consultor", nomeCompleto: "X Y" };
    render(<HomePage />);
    expect(screen.getByTestId("sidebar")).toHaveAttribute("data-role", "consultor");
    expect(screen.getByTestId("mobile-sidebar")).toHaveAttribute("data-role", "consultor");
    expect(screen.getByTestId("topbar")).toHaveAttribute("data-role", "consultor");
  });

  it("Sidebar recebe role=responsavel", () => {
    currentUser = { role: "Responsavel", nomeCompleto: "X Y" };
    render(<HomePage />);
    expect(screen.getByTestId("sidebar")).toHaveAttribute("data-role", "responsavel");
  });
});

describe("HomePage — métricas", () => {
  it("chama apiFetch('/api/avaliacoes') no mount", () => {
    render(<HomePage />);
    expect(apiFetchMock).toHaveBeenCalledWith("/api/avaliacoes");
  });

  it("conta corretamente cada status", async () => {
    apiFetchMock.mockResolvedValue([
      { id: 1, status: "Agendada" },
      { id: 2, status: "Agendada" },
      { id: 3, status: "EmAndamento" },
      { id: 4, status: "Concluida" },
      { id: 5, status: "Concluida" },
      { id: 6, status: "Cancelada" },
    ]);
    render(<HomePage />);

    // Total = 6, Agendadas = 2, EmAndamento = 1, Concluidas = 2
    await waitFor(() => {
      expect(screen.getByText("Total")).toBeInTheDocument();
      expect(screen.getByText("6")).toBeInTheDocument();
    });
    expect(screen.getByText("Agendadas")).toBeInTheDocument();
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
    expect(screen.getByText("Concluídas")).toBeInTheDocument();
    expect(screen.getByText("2", { selector: ".text-amber-500" })).toBeInTheDocument();
    expect(screen.getByText("1", { selector: ".text-\\[\\#0f62ac\\]" })).toBeInTheDocument();
    expect(screen.getByText("2", { selector: ".text-emerald-500" })).toBeInTheDocument();
  });

  it("zera contagens se apiFetch rejeitar (catch silencioso)", async () => {
    apiFetchMock.mockRejectedValue(new Error("network"));
    render(<HomePage />);
    await waitFor(() => {
      // todos os 4 cards devem mostrar 0 após resolvido
      const zeros = screen.getAllByText("0");
      expect(zeros.length).toBeGreaterThanOrEqual(4);
    });
  });
});

describe("HomePage — navegação", () => {
  it("botão 'Ver avaliações' navega para /avaliacoes", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole("button", { name: /ver avaliações/i }));
    expect(pushMock).toHaveBeenCalledWith("/avaliacoes");
  });
});
