"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, MobileSidebar, TopBar } from "@/app/projeto/components";
import { apiFetch } from "@/lib/api";

interface Avaliacao {
  id: number;
  status: "Agendada" | "EmAndamento" | "Concluida" | "Cancelada";
}

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

function StatCard({
  label,
  value,
  color,
  loading,
}: {
  label: string;
  value: number;
  color: string;
  loading: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#e5eaf0] bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">{label}</p>
      {loading ? (
        <div className="mt-2 h-8 w-12 animate-pulse rounded-lg bg-[#f0f4f8]" />
      ) : (
        <p className={`mt-1 text-[32px] font-bold leading-none ${color}`}>{value}</p>
      )}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const role = (user?.role?.toLowerCase() ?? "consultor") as "consultor" | "responsavel";
  const firstName = user?.nomeCompleto?.split(" ")[0] ?? (role === "responsavel" ? "Responsável" : "Consultor");

  useEffect(() => {
    apiFetch("/api/avaliacoes")
      .then((data) => setAvaliacoes(data))
      .catch(() => {})
      .finally(() => setLoadingMetrics(false));
  }, []);

  const total = avaliacoes.length;
  const agendadas = avaliacoes.filter((a) => a.status === "Agendada").length;
  const emAndamento = avaliacoes.filter((a) => a.status === "EmAndamento").length;
  const concluidas = avaliacoes.filter((a) => a.status === "Concluida").length;

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      <div className="hidden lg:block">
        <Sidebar
          role={role}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <MobileSidebar
        role={role}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-[240px]"}`}
      >
        <TopBar role={role} onMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Boas-vindas */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[#2e2e2e] sm:text-[26px]">
                Olá, {firstName} 👋
              </h1>
              <p className="mt-0.5 text-[14px] text-[#6b7280]">
                Bem-vindo ao NutriSec — Sistema de avaliação de segurança alimentar
              </p>
            </div>
            <button
              onClick={() => router.push("/avaliacoes")}
              className="inline-flex h-[38px] shrink-0 items-center gap-2 rounded-full bg-[#0f62ac] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90"
            >
              Ver avaliações
            </button>
          </div>

          {/* Métricas */}
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Total" value={total} color="text-[#2e2e2e]" loading={loadingMetrics} />
            <StatCard label="Agendadas" value={agendadas} color="text-amber-500" loading={loadingMetrics} />
            <StatCard label="Em andamento" value={emAndamento} color="text-[#0f62ac]" loading={loadingMetrics} />
            <StatCard label="Concluídas" value={concluidas} color="text-emerald-500" loading={loadingMetrics} />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
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

            {/* Onde já foi utilizado — 1 coluna */}
            <div className="rounded-2xl border border-[#e5eaf0] bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
                Onde já foi utilizado
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {[
                  "Navio de Pesquisa em Ciências do Mar — UFF",
                  "Coluni UFF",
                  "Restaurante Universitário da UFF",
                  "Batalhão da Polícia Militar do Rio de Janeiro",
                ].map((local) => (
                  <li key={local} className="flex items-start gap-2 text-[13px] text-[#4b5563]">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#0f62ac]" />
                    {local}
                  </li>
                ))}
              </ul>
            </div>

            {/* Classificações — largura total */}
            <div className="rounded-2xl border border-[#e5eaf0] bg-white p-6 lg:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
                Sistema de classificação
              </p>
              <p className="mt-1 text-[12px] text-[#9ca3af]">Resultado gerado após o preenchimento do checklist no REDCap</p>
              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  { label: "Categoria A", color: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500", desc: "Boas condições sanitárias. Pontuação < 13,3." },
                  { label: "Categoria B", color: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500", desc: "Condições regulares. Pontuação entre 13,3 e 502,7." },
                  { label: "Categoria C", color: "border-red-200 bg-red-50 text-red-700", dot: "bg-red-500", desc: "Condições inadequadas. Pontuação ≥ 502,7." },
                  { label: "Pendente", color: "border-gray-200 bg-gray-50 text-gray-600", dot: "bg-gray-400", desc: "Critério eliminatório não cumprido ou pontuação ≥ 1152,4." },
                ].map((c) => (
                  <div key={c.label} className={`rounded-xl border p-4 ${c.color}`}>
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${c.dot}`} />
                      <span className="text-[13px] font-bold">{c.label}</span>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed opacity-80">{c.desc}</p>
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

          {/* Footer */}
          <p className="mt-6 text-center text-[12px] text-[#c4cdd6]">
            Desenvolvido por João Gabriel Otogali e Caio Marcio da Silva · Alunos do Instituto de Computação — UFF, 2026
          </p>
        </main>
      </div>
    </div>
  );
}
