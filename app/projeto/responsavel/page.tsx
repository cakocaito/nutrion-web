"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import {
  Sidebar,
  MobileSidebar,
  TopBar,
  ProjectCard,
} from "../components";
import EmpresaSelecao from "./EmpresaSelecao";
import EntrarEmpresa from "./EntrarEmpresa";
import CadastrarEmpresa from "./CadastrarEmpresa";
import CadastrarEmpreendimento from "./CadastrarEmpreendimento";

type Tela =
  | "loading"
  | "selecao"
  | "entrar"
  | "cadastrar-empresa"
  | "painel"
  | "novo-empreendimento";

type Aba = "avaliacoes" | "empreendimentos";

interface Avaliacao {
  id: number;
  status: "Agendada" | "EmAndamento" | "Concluida" | "Cancelada";
  dataAgendada: string;
  estabelecimentoNome: string;
  estabelecimentoOrganizacao: string | null;
  temRelatorio: boolean;
}

function mapStatus(status: Avaliacao["status"]): "pendente" | "em_andamento" | "concluido" {
  switch (status) {
    case "Concluida": return "concluido";
    case "EmAndamento": return "em_andamento";
    default: return "pendente";
  }
}

function PainelResponsavel({ empresaId, onNovoEmpreendimento }: { empresaId: number; onNovoEmpreendimento: () => void }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aba, setAba] = useState<Aba>("avaliacoes");
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    apiFetch("/api/avaliacoes")
      .then(setAvaliacoes)
      .catch(() => {})
      .finally(() => setLoadingAvaliacoes(false));
  }, []);

  const avaliacoesFiltradas = avaliacoes.filter((a) => {
    const matchBusca = a.estabelecimentoNome.toLowerCase().includes(busca.toLowerCase());
    const matchStatus =
      filtroStatus === "todos"
        ? a.status !== "Cancelada"
        : (filtroStatus === "concluido" && a.status === "Concluida") ||
          (filtroStatus === "pendente" && a.status === "Agendada") ||
          (filtroStatus === "em_andamento" && a.status === "EmAndamento") ||
          (filtroStatus === "cancelada" && a.status === "Cancelada");
    return matchBusca && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      <div className="hidden lg:block">
        <Sidebar role="responsavel" collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>
      <MobileSidebar role="responsavel" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-[240px]"}`}>
        <TopBar role="responsavel" onMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[#2e2e2e] sm:text-[26px]">
                {aba === "avaliacoes" ? "Avaliações" : "Empreendimentos"}
              </h1>
              <p className="mt-0.5 text-[14px] text-[#6b7280]">
                {aba === "avaliacoes"
                  ? `${avaliacoesFiltradas.length} de ${avaliacoes.filter(a => a.status !== "Cancelada").length} avaliações`
                  : "Estabelecimentos vinculados à sua empresa"}
              </p>
            </div>
            {aba === "empreendimentos" && (
              <button
                onClick={onNovoEmpreendimento}
                className="inline-flex h-[38px] items-center gap-2 rounded-full bg-[#0f62ac] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90"
              >
                + Novo empreendimento
              </button>
            )}
          </div>

          {/* Abas */}
          <div className="mt-4 flex gap-1 rounded-xl bg-[#f0f4f8] p-1 w-fit">
            {([["avaliacoes", "Avaliações"], ["empreendimentos", "Empreendimentos"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setAba(key)}
                className={`h-[32px] rounded-lg px-4 text-[13px] font-semibold transition-colors ${aba === key ? "bg-white text-[#2e2e2e] shadow-sm" : "text-[#6b7280] hover:text-[#2e2e2e]"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Aba: Avaliações */}
          {aba === "avaliacoes" && (
            <>
              {/* Filtros */}
              <div className="mt-4 rounded-2xl border border-[#e5eaf0] bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    placeholder="Buscar por estabelecimento..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="h-[36px] flex-1 rounded-full border border-[#e5eaf0] bg-[#f8fafb] px-4 text-[13px] text-[#2e2e2e] placeholder-[#9ca3af] outline-none focus:border-[#0f62ac]/30"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { key: "todos", label: "Todos" },
                      { key: "pendente", label: "Agendadas" },
                      { key: "em_andamento", label: "Em andamento" },
                      { key: "concluido", label: "Concluídas" },
                    ].map((op) => (
                      <button
                        key={op.key}
                        onClick={() => setFiltroStatus(op.key)}
                        className={`h-[30px] rounded-full px-3 text-[12px] font-semibold transition-colors ${filtroStatus === op.key ? "bg-[#0f62ac] text-white" : "bg-[#f8fafb] text-[#6b7280] hover:bg-[#0f62ac]/10"}`}
                      >
                        {op.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {loadingAvaliacoes && <p className="text-[14px] text-[#6b7280]">Carregando avaliações...</p>}
                {!loadingAvaliacoes && avaliacoesFiltradas.length === 0 && (
                  <p className="text-[14px] text-[#6b7280]">Nenhuma avaliação encontrada.</p>
                )}
                {avaliacoesFiltradas.map((a) => (
                  <ProjectCard
                    key={a.id}
                    id={a.id}
                    title={a.estabelecimentoNome}
                    institution={a.estabelecimentoOrganizacao ?? "—"}
                    status={mapStatus(a.status)}
                    date={new Date(a.dataAgendada).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}
                    members={0}
                    temRelatorio={a.temRelatorio}
                  />
                ))}
              </div>
            </>
          )}

          {/* Aba: Empreendimentos */}
          {aba === "empreendimentos" && (
            <EmpreendimentosLista empresaId={empresaId} onNovoEmpreendimento={onNovoEmpreendimento} />
          )}
        </main>
      </div>
    </div>
  );
}

function EmpreendimentosLista({ empresaId, onNovoEmpreendimento }: { empresaId: number; onNovoEmpreendimento: () => void }) {
  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/api/estabelecimentos?empresaId=${empresaId}`)
      .then(setEstabelecimentos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [empresaId]);

  if (loading) return <div className="mt-8 flex justify-center"><div className="size-8 animate-spin rounded-full border-4 border-[#0f62ac] border-t-transparent" /></div>;

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {estabelecimentos.map((est) => (
        <div key={est.id} className="rounded-2xl border border-[#0f62ac]/15 bg-white p-5">
          <div className="flex items-start justify-between">
            <h3 className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-[#2e2e2e]">{est.nome}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${est.ativo ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
              {est.ativo ? "Ativo" : "Inativo"}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[#6b7280]">{est.endereco}</p>
          <div className="mt-3 space-y-0.5 text-[12px] text-[#6b7280]">
            {est.telefone && <p><span className="font-semibold">Tel:</span> {est.telefone}</p>}
          </div>
        </div>
      ))}
      <button
        onClick={onNovoEmpreendimento}
        className="flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#0f62ac]/25 bg-white/60 transition-all hover:border-[#0f62ac]/50 hover:bg-[#0f62ac]/5"
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-[#0f62ac]/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f62ac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <span className="text-[13px] font-bold text-[#0f62ac]">Novo empreendimento</span>
      </button>
    </div>
  );
}

export default function ProjetoResponsavel() {
  const { user, setUser } = useAuth();
  const [tela, setTela] = useState<Tela>("loading");
  const [empresaId, setEmpresaId] = useState<number | null>(null);

  useEffect(() => {
    const stored = getUser();
    if (stored) {
      if (!user) setUser(stored);
      if (stored.empresaId) {
        setEmpresaId(stored.empresaId);
        setTela("painel");
      } else {
        setTela("selecao");
      }
    } else {
      setTela("selecao");
    }
  }, []);

  function handleEmpresaVinculada(id: number) {
    setEmpresaId(id);
    const stored = getUser();
    if (stored) {
      stored.empresaId = id;
      localStorage.setItem("user", JSON.stringify(stored));
      setUser(stored);
    }
    setTela("painel");
  }

  if (tela === "loading") return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1f8fc]">
      <div className="size-8 animate-spin rounded-full border-4 border-[#0f62ac] border-t-transparent" />
    </div>
  );

  if (tela === "selecao") return <EmpresaSelecao onEntrar={() => setTela("entrar")} onCadastrar={() => setTela("cadastrar-empresa")} />;
  if (tela === "entrar") return <EntrarEmpresa onVoltar={() => setTela("selecao")} onSucesso={handleEmpresaVinculada} />;
  if (tela === "cadastrar-empresa") return <CadastrarEmpresa onVoltar={() => setTela("selecao")} onSucesso={handleEmpresaVinculada} />;
  if (tela === "novo-empreendimento" && empresaId) return (
    <CadastrarEmpreendimento empresaId={empresaId} onVoltar={() => setTela("painel")} onSucesso={() => setTela("painel")} />
  );

  return <PainelResponsavel empresaId={empresaId!} onNovoEmpreendimento={() => setTela("novo-empreendimento")} />;
}
