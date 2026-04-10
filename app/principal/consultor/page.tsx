"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, MobileSidebar, TopBar } from "@/app/projeto/components";

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
        <TopBar
          role="consultor"
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Boas-vindas */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[#2e2e2e] sm:text-[26px]">
                Olá, {user?.nomeCompleto?.split(" ")[0] ?? "Consultor"} 👋
              </h1>
              <p className="mt-1 text-[14px] font-medium text-[#6b7280]">
                Bem-vindo ao NutriSec — Sistema de avaliação de segurança alimentar
              </p>
            </div>
            <button
              onClick={() => router.push("/projeto/consultor")}
              className="inline-flex h-[38px] items-center gap-2 rounded-full bg-[#0f62ac] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90"
            >
              Ver avaliações
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {/* Sobre o projeto */}
            <div className="rounded-2xl border border-[#0f62ac]/15 bg-white p-6 lg:col-span-2">
              <h2 className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-[#2e2e2e]">
                Sobre o projeto
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-[#6b7280]">
                As Doenças de Transmissão Hídrica e Alimentar (DTHA) estão entre as principais causas de morbidade e mortalidade em nível global — cerca de 420.000 pessoas morrem anualmente vítimas de DTHA (OMS). As Boas Práticas (BPs) são obrigatórias para a garantia da segurança dos alimentos, sendo a aplicação de lista de verificação um instrumento essencial para avaliar não conformidades e riscos sanitários.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-[#6b7280]">
                O <strong className="text-[#2e2e2e]">NutriSec</strong> é um checklist digital desenvolvido para avaliar as condições operacionais e os fatores de risco sanitário com implicações diretas para as DTHA nos serviços de alimentação da Universidade Federal Fluminense.
              </p>
              <a
                href="https://revistapibic.uff.br/wp-content/uploads/sites/343/2026/01/RevistaPIBIC2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#0f62ac] transition-colors hover:text-[#0f62ac]/80"
              >
                Ver artigo publicado — Revista PIBIC UFF 2024
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Autores */}
            <div className="rounded-2xl border border-[#0f62ac]/15 bg-white p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-[#2e2e2e]">
                Equipe do projeto
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-[13px] text-[#6b7280]">
                <li><span className="font-semibold text-[#2e2e2e]">Maria das Graças G. A. Medeiros</span> — Faculdade de Nutrição</li>
                <li><span className="font-semibold text-[#2e2e2e]">Luisa Da Costa De Paula Antunes</span> — Faculdade de Nutrição</li>
                <li><span className="font-semibold text-[#2e2e2e]">Gustavo Constantino Fernandes</span> — Faculdade de Estatística</li>
                <li><span className="font-semibold text-[#2e2e2e]">João Gabriel Mattos Otogali</span> — Instituto da Computação</li>
                <li><span className="font-semibold text-[#2e2e2e]">Anna Beatriz de Sousa Oliveira</span> — Faculdade de Nutrição</li>
                <li><span className="font-semibold text-[#2e2e2e]">Maristela Soares Lourenço</span> — Faculdade de Nutrição</li>
                <li><span className="font-semibold text-[#2e2e2e]">Manoela Pessanha da Penha</span> — Faculdade de Nutrição</li>
                <li><span className="font-semibold text-[#2e2e2e]">Fernanda Silveira dos Anjos Bainha</span> — Faculdade de Nutrição</li>
              </ul>
            </div>

            {/* Parceiros */}
            <div className="rounded-2xl border border-[#0f62ac]/15 bg-white p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-[#2e2e2e]">
                Instituições parceiras
              </h2>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Image src="/images/uff-shield.png" alt="UFF" width={55} height={55} className="h-[48px] w-auto object-contain" />
                  <Image src="/images/partner-logo.svg" alt="UFF" width={120} height={30} className="h-[24px] w-auto object-contain" />
                </div>
                <div className="h-[40px] w-[1px] bg-[#0f62ac]/12" />
                <Image src="/images/ufrj-logo.png" alt="UFRJ" width={62} height={62} className="h-[48px] w-auto object-contain" />
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-[#6b7280]">
                Projeto desenvolvido com apoio da Pró-reitoria de Planejamento e da PROPPI da Universidade Federal Fluminense.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
