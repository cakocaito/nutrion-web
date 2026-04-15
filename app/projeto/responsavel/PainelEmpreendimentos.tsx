"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  MobileSidebar,
  TopBar,
  FilterIcon,
} from "../components";
import {
  listarEstabelecimentosPorEmpresa,
  Estabelecimento,
} from "@/lib/empresas";

export default function PainelEmpreendimentos({
  empresaId,
  onNovoEmpreendimento,
}: {
  empresaId: number;
  onNovoEmpreendimento: () => void;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarEstabelecimentosPorEmpresa(empresaId)
      .then(setEstabelecimentos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [empresaId]);

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
                Empreendimentos
              </h1>
              <p className="mt-1 text-[14px] font-medium text-[#6b7280]">
                Gerencie os empreendimentos da sua empresa
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex h-[38px] items-center gap-2 rounded-full border border-[#9e9e9e]/20 bg-white px-4 text-[13px] font-semibold text-[#6b7280] transition-colors hover:border-[#0f62ac]/20">
                <FilterIcon />
                Filtros
              </button>
            </div>
          </div>

          {/* Empreendimentos Grid */}
          {loading ? (
            <div className="mt-12 flex items-center justify-center">
              <div className="size-8 animate-spin rounded-full border-4 border-[#0f62ac] border-t-transparent" />
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {estabelecimentos.map((est) => (
                <EmpreendimentoCard key={est.id} estabelecimento={est} />
              ))}

              {/* Botão Adicionar */}
              <button
                onClick={onNovoEmpreendimento}
                className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#0f62ac]/25 bg-white/60 p-5 transition-all hover:border-[#0f62ac]/50 hover:bg-[#0f62ac]/5"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-[#0f62ac]/10">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0f62ac"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <span className="font-[family-name:var(--font-heading)] text-[14px] font-bold text-[#0f62ac]">
                  Novo empreendimento
                </span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function EmpreendimentoCard({
  estabelecimento,
}: {
  estabelecimento: Estabelecimento;
}) {
  const dataFormatada = new Date(
    estabelecimento.dataCriacao
  ).toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-[#0f62ac]/15 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-[#2e2e2e]">
            {estabelecimento.nome}
          </h3>
          <p className="mt-1 text-[13px] font-medium text-[#6b7280]">
            {estabelecimento.endereco}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
            estabelecimento.ativo
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {estabelecimento.ativo ? "Ativo" : "Inativo"}
        </span>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[12px] text-[#6b7280]">
          <span className="font-semibold">Telefone:</span>{" "}
          {estabelecimento.telefone}
        </p>
        <p className="text-[12px] text-[#6b7280]">
          <span className="font-semibold">Email:</span>{" "}
          {estabelecimento.email}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between text-[12px] text-[#6b7280]">
        <span>{dataFormatada}</span>
        {estabelecimento.responsavelNome && (
          <span>{estabelecimento.responsavelNome}</span>
        )}
      </div>
    </div>
  );
}
