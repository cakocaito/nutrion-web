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

export default function ProjetoConsultor() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/api/avaliacoes")
      .then(setAvaliacoes)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
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
              <button className="inline-flex h-[38px] items-center gap-2 rounded-full bg-[#0f62ac] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90">
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
                title={a.estabelecimentoNome}
                institution={a.estabelecimentoOrganizacao ?? "—"}
                status={mapStatus(a.status)}
                date={new Date(a.dataAgendada).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}
                members={0}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
