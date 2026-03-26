"use client";

import { useState } from "react";
import {
  Sidebar,
  MobileSidebar,
  TopBar,
  ProjectCard,
  FilterIcon,
} from "../components";

const projects = [
  {
    title: "Avaliação RU Gragoatá",
    institution: "UFF — Niterói",
    status: "em_andamento" as const,
    date: "Mar 2026",
    members: 4,
  },
  {
    title: "Avaliação RU Valonguinho",
    institution: "UFF — Niterói",
    status: "pendente" as const,
    date: "Fev 2026",
    members: 2,
  },
  {
    title: "Avaliação Bandejão Central",
    institution: "UFRJ — Fundão",
    status: "concluido" as const,
    date: "Jan 2026",
    members: 5,
  },
  {
    title: "Avaliação Refeitório CT",
    institution: "UFRJ — Fundão",
    status: "em_andamento" as const,
    date: "Mar 2026",
    members: 3,
  },
  {
    title: "Avaliação RU Praia Vermelha",
    institution: "UFF — Niterói",
    status: "pendente" as const,
    date: "Mar 2026",
    members: 2,
  },
  {
    title: "Avaliação Cantina Letras",
    institution: "UFRJ — Fundão",
    status: "concluido" as const,
    date: "Dez 2025",
    members: 6,
  },
];

export default function ProjetoResponsavel() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          role="responsavel"
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        role="responsavel"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-[240px]"}`}
      >
        <TopBar
          role="responsavel"
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
                Responsável — Gerencie suas unidades de refeição
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex h-[38px] items-center gap-2 rounded-full border border-[#9e9e9e]/20 bg-white px-4 text-[13px] font-semibold text-[#6b7280] transition-colors hover:border-[#0f62ac]/20">
                <FilterIcon />
                Filtros
              </button>
              <button className="inline-flex h-[38px] items-center gap-2 rounded-full bg-[#0f62ac] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90">
                + Novo projeto
              </button>
            </div>
          </div>

          {/* Project Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
