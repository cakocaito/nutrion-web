import { apiFetch } from "./api";

export interface Empresa {
  id: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  totalEstabelecimentos: number;
  dataCriacao: string;
}

export interface Estabelecimento {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  cep: string;
  telefone: string;
  email: string;
  ativo: boolean;
  empresaNome: string | null;
  responsavelNome: string | null;
  dataCriacao: string;
}

export async function buscarEmpresaPorCnpj(cnpj: string): Promise<Empresa> {
  return apiFetch(`/api/empresas/buscar?cnpj=${encodeURIComponent(cnpj)}`);
}

export async function criarEmpresa(data: {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
}): Promise<Empresa> {
  return apiFetch("/api/empresas", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function vincularEmpresaAoUsuario(empresaId: number): Promise<void> {
  const result = await apiFetch("/api/auth/empresa", {
    method: "PUT",
    body: JSON.stringify({ empresaId }),
  });

  // Update stored user with new empresaId
  const raw = localStorage.getItem("user");
  if (raw) {
    const user = JSON.parse(raw);
    user.empresaId = empresaId;
    localStorage.setItem("user", JSON.stringify(user));
  }

  return result;
}

export async function listarEstabelecimentosPorEmpresa(
  empresaId: number
): Promise<Estabelecimento[]> {
  return apiFetch(`/api/estabelecimentos?empresaId=${empresaId}`);
}

export async function criarEstabelecimento(data: {
  nome: string;
  cnpj: string;
  endereco: string;
  cep: string;
  telefone: string;
  email: string;
  empresaId: number;
}): Promise<Estabelecimento> {
  return apiFetch("/api/estabelecimentos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
