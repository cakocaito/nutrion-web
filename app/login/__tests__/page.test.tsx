import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/login/page";

const pushMock = vi.fn();
const replaceMock = vi.fn();
const loginMock = vi.fn();
const setUserMock = vi.fn();
let currentUser: unknown = null;

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, replace: replaceMock }),
}));

vi.mock("@/lib/auth", () => ({
  login: (...args: unknown[]) => loginMock(...args),
}));

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ user: currentUser, setUser: setUserMock }),
}));

beforeEach(() => {
  pushMock.mockReset();
  replaceMock.mockReset();
  loginMock.mockReset();
  setUserMock.mockReset();
  currentUser = null;
});

describe("LoginPage — render", () => {
  it("renderiza campos de e-mail, senha e botões", () => {
    render(<LoginPage />);
    expect(
      screen.getByPlaceholderText(/endereço de e-mail/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^continuar$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /criar conta/i })).toBeInTheDocument();
  });
});

describe("LoginPage — validação", () => {
  it("não chama login quando e-mail está vazio e mostra erro", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    await user.click(screen.getByRole("button", { name: /^continuar$/i }));

    expect(loginMock).not.toHaveBeenCalled();
    expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument();
  });

  it("não chama login quando senha está vazia/curta e mostra erro de senha", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    await user.type(
      screen.getByPlaceholderText(/endereço de e-mail/i),
      "caio@uff.br",
    );
    await user.type(screen.getByPlaceholderText("Senha"), "123");
    await user.click(screen.getByRole("button", { name: /^continuar$/i }));

    expect(loginMock).not.toHaveBeenCalled();
    expect(
      screen.getByText(/senha deve ter no mínimo 8 caracteres/i),
    ).toBeInTheDocument();
  });
});

describe("LoginPage — submit", () => {
  it("em sucesso, salva user no contexto e navega para /home", async () => {
    const fakeUser = { token: "t", email: "x", nomeCompleto: "X Y", role: "Consultor", expiration: "", empresaId: null };
    loginMock.mockResolvedValue(fakeUser);

    const user = userEvent.setup();
    render(<LoginPage />);
    await user.type(
      screen.getByPlaceholderText(/endereço de e-mail/i),
      "caio@uff.br",
    );
    await user.type(screen.getByPlaceholderText("Senha"), "senha1234");
    await user.click(screen.getByRole("button", { name: /^continuar$/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("caio@uff.br", "senha1234");
      expect(setUserMock).toHaveBeenCalledWith(fakeUser);
      expect(pushMock).toHaveBeenCalledWith("/home");
    });
  });

  it("em falha, mostra a mensagem de erro do backend", async () => {
    loginMock.mockRejectedValue(new Error("Credenciais inválidas."));

    const user = userEvent.setup();
    render(<LoginPage />);
    await user.type(
      screen.getByPlaceholderText(/endereço de e-mail/i),
      "caio@uff.br",
    );
    await user.type(screen.getByPlaceholderText("Senha"), "senha1234");
    await user.click(screen.getByRole("button", { name: /^continuar$/i }));

    expect(await screen.findByText(/credenciais inválidas/i)).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("Enter no campo de senha dispara o login", async () => {
    loginMock.mockResolvedValue({});
    const user = userEvent.setup();
    render(<LoginPage />);
    await user.type(
      screen.getByPlaceholderText(/endereço de e-mail/i),
      "caio@uff.br",
    );
    await user.type(screen.getByPlaceholderText("Senha"), "senha1234{enter}");

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
    });
  });

  it("durante o submit o botão exibe 'Entrando...' e fica desabilitado", async () => {
    let resolveLogin: ((v: unknown) => void) | undefined;
    loginMock.mockImplementation(
      () => new Promise((res) => { resolveLogin = res; }),
    );

    const user = userEvent.setup();
    render(<LoginPage />);
    await user.type(
      screen.getByPlaceholderText(/endereço de e-mail/i),
      "caio@uff.br",
    );
    await user.type(screen.getByPlaceholderText("Senha"), "senha1234");
    await user.click(screen.getByRole("button", { name: /^continuar$/i }));

    const button = screen.getByRole("button", { name: /entrando/i });
    expect(button).toBeDisabled();

    resolveLogin?.({});
    await waitFor(() => expect(pushMock).toHaveBeenCalled());
  });
});

describe("LoginPage — usuário já autenticado", () => {
  it("redireciona para /home via router.replace", async () => {
    currentUser = {
      token: "t",
      email: "x",
      nomeCompleto: "X Y",
      role: "Consultor",
      expiration: "",
      empresaId: null,
    };
    render(<LoginPage />);
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/home");
    });
  });
});

describe("LoginPage — navegação secundária", () => {
  it("botão 'Criar conta' navega para /cadastro", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    await user.click(screen.getByRole("button", { name: /criar conta/i }));
    expect(pushMock).toHaveBeenCalledWith("/cadastro");
  });
});
