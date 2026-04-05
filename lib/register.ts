import { apiFetch } from "./api";

export interface RegisterPayload {
  codigoConvite: string;
  tipoUsuario: "Consultor" | "Responsavel";
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  password: string;
  estabelecimentoId?: number;
}

export async function register(payload: RegisterPayload): Promise<void> {
  await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getEstabelecimentos(): Promise<{ id: number; nome: string }[]> {
  return apiFetch("/api/estabelecimentos");
}
