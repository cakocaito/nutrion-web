"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, MobileSidebar, TopBar } from "@/app/projeto/components";

const desenvolvedores = [
  "João Gabriel Mattos Otogali",
  "Caio Marcio de Souza Santos da Silva",
];

const pesquisadores = [
  { nome: "Maria das Graças G. A. Medeiros", faculdade: "Nutrição" },
  { nome: "Luisa Da Costa De Paula Antunes", faculdade: "Nutrição" },
  { nome: "Gustavo Constantino Fernandes", faculdade: "Estatística" },
  { nome: "João Gabriel Mattos Otogali", faculdade: "Computação" },
  { nome: "Anna Beatriz de Sousa Oliveira", faculdade: "Nutrição" },
  { nome: "Maristela Soares Lourenço", faculdade: "Nutrição" },
  { nome: "Manoela Pessanha da Penha", faculdade: "Nutrição" },
  { nome: "Fernanda Silveira dos Anjos Bainha", faculdade: "Nutrição" },
];

export default function PrincipalConsultor() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      <div className="hidden lg:block">
        <Sidebar
          role="consultor"
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <MobileSidebar
        role="consultor"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-[240px]"}`}
      >
        <TopBar role="consultor" onMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Boas-vindas */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[#2e2e2e] sm:text-[26px]">
                Olá, {user?.nomeCompleto?.split(" ")[0] ?? "Consultor"} 👋
              </h1>
              <p className="mt-0.5 text-[14px] text-[#6b7280]">
                Bem-vindo ao NutriSec — Sistema de avaliação de segurança alimentar
              </p>
            </div>
            <button
              onClick={() => router.push("/projeto/consultor")}
              className="inline-flex h-[38px] shrink-0 items-center gap-2 rounded-full bg-[#0f62ac] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90"
            >
              Ver avaliações
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Sobre o projeto — ocupa 2 colunas */}
            <div className="rounded-2xl border border-[#e5eaf0] bg-white p-6 lg:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
                Sobre o projeto
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-[#4b5563]">
                As Doenças de Transmissão Hídrica e Alimentar (DTHA) estão entre as principais causas de
                morbidade e mortalidade em nível global — cerca de{" "}
                <span className="font-semibold text-[#2e2e2e]">420.000 pessoas morrem anualmente</span> vítimas
                de DTHA (OMS). As Boas Práticas são obrigatórias para a garantia da segurança dos alimentos,
                sendo o checklist um instrumento essencial para avaliar não conformidades e riscos sanitários.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-[#4b5563]">
                O <span className="font-semibold text-[#2e2e2e]">NutriSec</span> é um sistema digital de
                avaliação desenvolvido para os serviços de alimentação da Universidade Federal Fluminense.
              </p>

              {/* Artigo */}
              <a
                href="https://revistapibic.uff.br/wp-content/uploads/sites/343/2026/01/RevistaPIBIC2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-3 rounded-xl border border-[#0f62ac]/20 bg-[#0f62ac]/5 px-4 py-3 transition-colors hover:bg-[#0f62ac]/10"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0f62ac]/15">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0f62ac" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#0f62ac]">Artigo publicado — Revista PIBIC UFF 2024</p>
                  <p className="text-[12px] text-[#6b7280]">Versão anterior do projeto · revistapibic.uff.br</p>
                </div>
                <svg className="ml-auto shrink-0 text-[#0f62ac]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Instituições parceiras — 1 coluna */}
            <div className="rounded-2xl border border-[#e5eaf0] bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
                Instituições parceiras
              </p>
              <div className="mt-5 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Image src="/images/uff-shield.png" alt="UFF" width={40} height={40} className="h-[38px] w-auto object-contain" />
                  <Image src="/images/partner-logo.svg" alt="Universidade Federal Fluminense" width={110} height={26} className="h-[22px] w-auto object-contain" />
                </div>
                <div className="h-px bg-[#e5eaf0]" />
                <Image src="/images/ufrj-logo.png" alt="UFRJ" width={56} height={56} className="h-[44px] w-auto object-contain" />
              </div>
              <p className="mt-5 text-[12px] leading-relaxed text-[#9ca3af]">
                Com apoio da Pró-reitoria de Planejamento e da PROPPI da UFF.
              </p>
            </div>

            {/* Desenvolvimento do sistema */}
            <div className="rounded-2xl border border-[#e5eaf0] bg-white p-6 lg:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
                Desenvolvimento do sistema
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {desenvolvedores.map((nome) => (
                  <div key={nome} className="flex items-center gap-3 rounded-xl bg-[#f8fafb] px-4 py-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#0f62ac] text-[12px] font-bold text-white">
                      {nome.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                    </div>
                    <p className="text-[13px] font-semibold text-[#2e2e2e]">{nome}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pesquisadores envolvidos — largura total */}
            <div className="rounded-2xl border border-[#e5eaf0] bg-white p-6 lg:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
                Pesquisadores envolvidos
              </p>
              <p className="mt-1 text-[12px] text-[#9ca3af]">Autores do estudo publicado na Revista PIBIC UFF 2024</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {pesquisadores.map((p) => (
                  <div key={p.nome} className="rounded-xl bg-[#f8fafb] px-3 py-2.5">
                    <p className="text-[13px] font-semibold leading-snug text-[#2e2e2e]">{p.nome}</p>
                    <p className="mt-0.5 text-[11px] text-[#9ca3af]">Fac. de {p.faculdade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
