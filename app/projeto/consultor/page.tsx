"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  MobileSidebar,
  TopBar,
  ProjectCard,
  FilterIcon,
} from "../components";
import { apiFetch } from "@/lib/api";
import { maskCNPJ, validateCNPJ, validateDataAgendada } from "@/lib/validators";

interface Avaliacao {
  id: number;
  status: "Agendada" | "EmAndamento" | "Concluida" | "Cancelada";
  dataAgendada: string;
  estabelecimentoNome: string;
  estabelecimentoOrganizacao: string | null;
  temRelatorio: boolean;
}

interface Estabelecimento {
  id: number;
  nome: string;
  cnpj: string;
  empresaNome: string | null;
}

function mapStatus(status: Avaliacao["status"]): "pendente" | "em_andamento" | "concluido" {
  switch (status) {
    case "Concluida": return "concluido";
    case "EmAndamento": return "em_andamento";
    default: return "pendente";
  }
}

function NovaAvaliacaoModal({
  onClose,
  onCriada,
}: {
  onClose: () => void;
  onCriada: () => void;
}) {
  const [cnpj, setCnpj] = useState("");
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento | null>(null);
  const [dataAgendada, setDataAgendada] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [codigoCriado, setCodigoCriado] = useState<number | null>(null);
  const [copiado, setCopiado] = useState(false);

  async function buscarEstabelecimento() {
    setErro(null);
    const cnpjErr = validateCNPJ(cnpj);
    if (cnpjErr) {
      setErro(cnpjErr);
      return;
    }
    setBuscando(true);
    try {
      const data = await apiFetch(`/api/estabelecimentos/buscar?cnpj=${cnpj.replace(/\D/g, "")}`);
      setEstabelecimento(data);
    } catch {
      setErro("Estabelecimento não encontrado.");
      setEstabelecimento(null);
    } finally {
      setBuscando(false);
    }
  }

  async function salvar() {
    if (!estabelecimento) {
      setErro("Busque um estabelecimento pelo CNPJ.");
      return;
    }
    const dataErr = validateDataAgendada(dataAgendada);
    if (dataErr) {
      setErro(dataErr);
      return;
    }
    setSalvando(true);
    setErro(null);
    try {
      const data = await apiFetch("/api/avaliacoes", {
        method: "POST",
        body: JSON.stringify({
          estabelecimentoId: estabelecimento.id,
          dataAgendada,
        }),
      });
      onCriada();
      setCodigoCriado(data.id);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao criar avaliação.");
    } finally {
      setSalvando(false);
    }
  }

  function copiarCodigo() {
    if (codigoCriado) {
      navigator.clipboard.writeText(String(codigoCriado));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  }

  // Tela de confirmação após criar
  if (codigoCriado) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-xl text-center">
          <div className="mx-auto mb-4 flex size-[48px] items-center justify-center rounded-full bg-emerald-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-[18px] font-bold text-[#2e2e2e]">
            Avaliação criada!
          </h2>
          <p className="mt-2 text-[13px] text-[#6b7280]">
            Use o código abaixo no campo <strong>id_pesquisa</strong> do REDCap durante a vistoria.
          </p>
          <div className="mt-5 rounded-xl border-2 border-dashed border-[#0f62ac]/30 bg-[#f1f8fc] py-4">
            <p className="font-[family-name:var(--font-heading)] text-[36px] font-bold tracking-widest text-[#0f62ac]">
              {codigoCriado}
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              onClick={copiarCodigo}
              className="h-[40px] flex-1 rounded-full border border-[#0f62ac]/30 text-[13px] font-semibold text-[#0f62ac] transition-colors hover:bg-[#0f62ac]/5"
            >
              {copiado ? "Copiado!" : "Copiar código"}
            </button>
            <button
              onClick={onClose}
              className="h-[40px] flex-1 rounded-full bg-[#0f62ac] text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="font-[family-name:var(--font-heading)] text-[18px] font-bold text-[#2e2e2e]">
          Nova avaliação
        </h2>
        <p className="mt-1 text-[13px] text-[#6b7280]">
          Busque o estabelecimento pelo CNPJ e defina a data.
        </p>

        <div className="mt-5 flex flex-col gap-4">
          {/* CNPJ */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#2e2e2e]">
              CNPJ do estabelecimento
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(maskCNPJ(e.target.value))}
                className="h-[40px] flex-1 rounded-lg border border-[#9e9e9e]/30 px-3 text-[14px] text-[#2e2e2e] outline-none focus:border-[#0f62ac]/50"
              />
              <button
                onClick={buscarEstabelecimento}
                disabled={buscando}
                className="h-[40px] rounded-lg bg-[#0f62ac]/10 px-4 text-[13px] font-semibold text-[#0f62ac] transition-colors hover:bg-[#0f62ac]/20 disabled:opacity-50"
              >
                {buscando ? "..." : "Buscar"}
              </button>
            </div>
          </div>

          {/* Estabelecimento encontrado */}
          {estabelecimento && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-[14px] font-semibold text-emerald-700">{estabelecimento.nome}</p>
              {estabelecimento.empresaNome && (
                <p className="text-[12px] text-emerald-600">{estabelecimento.empresaNome}</p>
              )}
            </div>
          )}

          {/* Data */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#2e2e2e]">
              Data agendada
            </label>
            <input
              type="date"
              value={dataAgendada}
              onChange={(e) => setDataAgendada(e.target.value)}
              className="h-[40px] w-full rounded-lg border border-[#9e9e9e]/30 px-3 text-[14px] text-[#2e2e2e] outline-none focus:border-[#0f62ac]/50"
            />
          </div>

          {erro && <p className="text-[13px] text-[#f25050]">{erro}</p>}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="h-[40px] flex-1 rounded-full border border-[#9e9e9e]/30 text-[13px] font-semibold text-[#6b7280] transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={salvar}
            disabled={salvando || !estabelecimento}
            className="h-[40px] flex-1 rounded-full bg-[#0f62ac] text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90 disabled:opacity-50"
          >
            {salvando ? "Criando..." : "Criar avaliação"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjetoConsultor() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  function carregarAvaliacoes() {
    setLoading(true);
    apiFetch("/api/avaliacoes")
      .then(setAvaliacoes)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      {modalAberto && (
        <NovaAvaliacaoModal
          onClose={() => setModalAberto(false)}
          onCriada={carregarAvaliacoes}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          role="consultor"
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        role="consultor"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-[240px]"}`}
      >
        <TopBar
          role="consultor"
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[#2e2e2e] sm:text-[26px]">
                Meus Projetos
              </h1>
              <p className="mt-1 text-[14px] font-medium text-[#6b7280]">
                Consultor — Avaliações em andamento
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex h-[38px] items-center gap-2 rounded-full border border-[#9e9e9e]/20 bg-white px-4 text-[13px] font-semibold text-[#6b7280] transition-colors hover:border-[#0f62ac]/20">
                <FilterIcon />
                Filtros
              </button>
              <button
                onClick={() => setModalAberto(true)}
                className="inline-flex h-[38px] items-center gap-2 rounded-full bg-[#0f62ac] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90"
              >
                + Nova avaliação
              </button>
            </div>
          </div>

          {/* Project Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {loading && (
              <p className="text-[14px] text-[#6b7280]">Carregando avaliações...</p>
            )}
            {erro && (
              <p className="text-[14px] text-[#f25050]">{erro}</p>
            )}
            {!loading && !erro && avaliacoes.length === 0 && (
              <p className="text-[14px] text-[#6b7280]">Nenhuma avaliação encontrada.</p>
            )}
            {avaliacoes.map((a) => (
              <ProjectCard
                key={a.id}
                id={a.id}
                title={a.estabelecimentoNome}
                institution={a.estabelecimentoOrganizacao ?? "—"}
                status={mapStatus(a.status)}
                date={new Date(a.dataAgendada).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}
                members={0}
                temRelatorio={a.temRelatorio}
                onCancelado={carregarAvaliacoes}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
