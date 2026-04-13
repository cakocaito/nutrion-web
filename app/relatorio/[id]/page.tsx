"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, MobileSidebar, TopBar } from "@/app/projeto/components";
import { apiFetch } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface RelatorioSecao {
  secao: string;
  secaoNome: string;
  pontuacaoSecao: number;
  totalItens: number;
  itensNaoConformes: number;
  percentualConformidade: number;
}

interface Relatorio {
  id: number;
  pontuacaoTotal: number;
  categoria: "A" | "B" | "C" | "Pendente";
  cumpriuEliminatorios: boolean;
  cumpriuClassificatorios: boolean;
  propostaIntervencao: string | null;
  dataGeracao: string;
  estabelecimentoNome: string;
  dataAvaliacao: string;
  consultorNome: string;
  secoes: RelatorioSecao[];
}

/* Map raw API section names to proper Portuguese */
const secaoNomeMap: Record<string, string> = {
  AbastecimentoAgua: "Abastecimento de água",
  abastecimentoAgua: "Abastecimento de água",
  PreparacaoAlimentos: "Preparação de alimentos",
  preparacaoAlimentos: "Preparação de alimentos",
  HigienizacaoInstalacoes: "Higienização de instalações, equipamentos, móveis e utensílios",
  higienizacaoInstalacoes: "Higienização de instalações, equipamentos, móveis e utensílios",
  ControleVetoresPragas: "Controle integrado de vetores e pragas urbanas",
  controleVetoresPragas: "Controle integrado de vetores e pragas urbanas",
  ManipuladorAlimentos: "Manipuladores de alimentos",
  manipuladorAlimentos: "Manipuladores de alimentos",
  MateriaPrimaIngredientes: "Matéria-prima, ingredientes e embalagens",
  materiaPrimaIngredientes: "Matéria-prima, ingredientes e embalagens",
  Documentacao: "Documentação e registro",
  documentacao: "Documentação e registro",
  ResponsabilidadeTecnica: "Responsabilidade técnica",
  responsabilidadeTecnica: "Responsabilidade técnica",
  Edificacoes: "Edificações, instalações, equipamentos, móveis e utensílios",
  edificacoes: "Edificações, instalações, equipamentos, móveis e utensílios",
};

function formatSecaoNome(nome: string): string {
  if (secaoNomeMap[nome]) return secaoNomeMap[nome];
  // Fallback: split camelCase/PascalCase into words
  return nome
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

const categoriaConfig = {
  A: { label: "Categoria A", bg: "bg-emerald-600", text: "text-white", border: "border-emerald-600", dot: "bg-white", desc: "Boas condições sanitárias", light: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  B: { label: "Categoria B", bg: "bg-amber-500", text: "text-white", border: "border-amber-500", dot: "bg-white", desc: "Condições regulares — requer atenção", light: "bg-amber-50 text-amber-700 border-amber-200" },
  C: { label: "Categoria C", bg: "bg-red-600", text: "text-white", border: "border-red-600", dot: "bg-white", desc: "Condições inadequadas — ação imediata", light: "bg-red-50 text-red-700 border-red-200" },
  Pendente: { label: "Pendente", bg: "bg-[#2d3748]", text: "text-white", border: "border-[#2d3748]", dot: "bg-white", desc: "Aguardando processamento", light: "bg-gray-50 text-gray-600 border-gray-200" },
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const conformes = payload.find((p: any) => p.dataKey === "conformes")?.value ?? 0;
  const naoConformes = payload.find((p: any) => p.dataKey === "naoConformes")?.value ?? 0;
  const total = conformes + naoConformes;
  return (
    <div className="rounded-lg border border-[#e2e8f0] bg-white p-3 shadow-lg text-[13px]">
      <p className="font-bold text-[#1a365d] mb-1.5">{label}</p>
      <p className="text-[#2b6cb0]">Conformes: {conformes} ({total > 0 ? ((conformes / total) * 100).toFixed(0) : 0}%)</p>
      <p className="text-[#e53e3e]">Não conformes: {naoConformes} ({total > 0 ? ((naoConformes / total) * 100).toFixed(0) : 0}%)</p>
    </div>
  );
}

function ClassificacaoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[500px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-[#1a365d] px-6 py-4">
          <h2 className="text-[15px] font-bold text-white">Sistema de classificação</h2>
          <button onClick={onClose} className="flex size-7 items-center justify-center rounded-full text-white/70 hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="space-y-3 p-6">
          {[
            {
              label: "Categoria A",
              color: "border-emerald-200 bg-emerald-50 text-emerald-700",
              dot: "bg-emerald-500",
              titulo: "Boas condições sanitárias",
              desc: "O estabelecimento apresenta baixo nível de não conformidades. Pontuação inferior a 13,3 pontos. Indica que as boas práticas estão sendo seguidas adequadamente.",
              range: "≥ 0 e < 13,3",
            },
            {
              label: "Categoria B",
              color: "border-amber-200 bg-amber-50 text-amber-700",
              dot: "bg-amber-500",
              titulo: "Condições regulares",
              desc: "Nível intermediário de não conformidades. Pontuação entre 13,3 e 502,7 pontos. Requer atenção e implementação de melhorias para evitar riscos sanitários.",
              range: "≥ 13,3 e < 502,7",
            },
            {
              label: "Categoria C",
              color: "border-red-200 bg-red-50 text-red-700",
              dot: "bg-red-500",
              titulo: "Condições inadequadas",
              desc: "Alto nível de não conformidades. Pontuação igual ou superior a 502,7 pontos. Exige ação corretiva imediata para garantir a segurança alimentar.",
              range: "≥ 502,7 e < 1152,3",
            },
            {
              label: "Pendente",
              color: "border-gray-200 bg-gray-50 text-gray-600",
              dot: "bg-gray-400",
              titulo: "Critério eliminatório ou pontuação crítica",
              desc: "Atribuída quando o estabelecimento não cumpre os critérios eliminatórios (relacionados ao abastecimento de água) ou atinge pontuação igual ou superior a 1152,4 pontos.",
              range: "≥ 1152,4",
            },
          ].map((c) => (
            <div key={c.label} className={`rounded-xl border p-4 ${c.color}`}>
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${c.dot}`} />
                <span className="text-[13px] font-bold">{c.label}</span>
                <span className="text-[12px] font-medium opacity-80">— {c.titulo}</span>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed opacity-80">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section title with blue underline (matches PDF style) ── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="font-[family-name:var(--font-heading)] text-[18px] font-bold text-[#1a365d]">
        {children}
      </h2>
      <div className="mt-1.5 h-[3px] w-[50px] rounded-full bg-[#0f62ac]" />
    </div>
  );
}

export default function RelatorioPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalClassificacao, setModalClassificacao] = useState(false);

  const role = (user?.role?.toLowerCase() ?? "consultor") as "consultor" | "responsavel";

  useEffect(() => {
    apiFetch(`/api/avaliacoes/${id}/relatorio`)
      .then(setRelatorio)
      .catch((e) => setErro(e?.message ?? "Erro ao carregar relatório."))
      .finally(() => setLoading(false));
  }, [id]);

  const cat = relatorio ? categoriaConfig[relatorio.categoria] : null;

  const chartData = relatorio?.secoes.map((s) => ({
    name: formatSecaoNome(s.secaoNome),
    conformes: s.totalItens - s.itensNaoConformes,
    naoConformes: s.itensNaoConformes,
  })) ?? [];

  const totalItens = relatorio?.secoes.reduce((sum, s) => sum + s.totalItens, 0) ?? 0;
  const totalNaoConformes = relatorio?.secoes.reduce((sum, s) => sum + s.itensNaoConformes, 0) ?? 0;
  const percentualGeralConformidade = totalItens > 0 ? (((totalItens - totalNaoConformes) / totalItens) * 100).toFixed(1) : "0";

  return (
    <div className="flex min-h-screen bg-[#edf2f7]">
      <div className="no-print hidden lg:block">
        <Sidebar role={role} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>
      <div className="no-print">
        <MobileSidebar role={role} open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </div>

      <div className={`print-area flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-[240px]"}`}>
        <div className="no-print">
          <TopBar role={role} onMenuToggle={() => setMobileMenuOpen(true)} />
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="no-print mb-5 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6b7280] transition-colors hover:text-[#2e2e2e]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Voltar
            </button>
            {relatorio && (
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-full border border-[#e5eaf0] bg-white px-4 py-2 text-[13px] font-semibold text-[#2e2e2e] transition-colors hover:border-[#0f62ac]/30 hover:text-[#0f62ac]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                Exportar PDF
              </button>
            )}
          </div>

          <style>{`
            @media print {
              .no-print { display: none !important; }
              body { background: white !important; }
              .print-area { margin-left: 0 !important; }
            }
          `}</style>

          {loading && (
            <div className="flex items-center gap-3 text-[14px] text-[#6b7280]">
              <div className="size-4 animate-spin rounded-full border-2 border-[#0f62ac] border-t-transparent" />
              Carregando relatório...
            </div>
          )}

          {erro && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-[14px] text-red-600">
              {erro}
            </div>
          )}

          {modalClassificacao && <ClassificacaoModal onClose={() => setModalClassificacao(false)} />}

          {relatorio && cat && (
            <div className="max-w-[860px] space-y-5">

              {/* ── Cover header (PDF style) ── */}
              <div className="overflow-hidden rounded-2xl">
                {/* Blue top bar */}
                <div className="bg-[#0f62ac] px-6 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                    Resultado da avaliação do risco sanitário
                  </p>
                  <h1 className="mt-1 font-[family-name:var(--font-heading)] text-[22px] font-bold text-white">
                    {relatorio.estabelecimentoNome}
                  </h1>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-white/70">
                    <span>Data: {new Date(relatorio.dataAvaliacao).toLocaleDateString("pt-BR")}</span>
                    <span>Consultor: {relatorio.consultorNome}</span>
                  </div>
                </div>
              </div>

              {/* ── Análise Geral (PDF "Resumo" style) ── */}
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="border-b border-[#e2e8f0] px-6 py-4">
                  <SectionTitle>Análise Geral</SectionTitle>
                </div>
                <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
                  {/* Categoria */}
                  <div className={`flex flex-col items-center justify-center p-6 ${cat.bg}`}>
                    <p className={`text-[11px] font-semibold uppercase tracking-widest ${cat.text} opacity-70`}>
                      Categoria
                    </p>
                    <p className={`mt-1 font-[family-name:var(--font-heading)] text-[28px] font-bold ${cat.text}`}>
                      {relatorio.categoria === "Pendente" ? "Pendente" : relatorio.categoria}
                    </p>
                    <p className={`mt-1 text-[12px] font-medium ${cat.text} opacity-80`}>
                      {cat.desc}
                    </p>
                  </div>
                  {/* Pontuação */}
                  <div className="flex flex-col items-center justify-center border-x border-[#e2e8f0] p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#718096]">
                      Pontuação Total
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-heading)] text-[36px] font-bold text-[#1a365d]">
                      {relatorio.pontuacaoTotal.toFixed(1)}
                    </p>
                  </div>
                  {/* % Conformidade */}
                  <div className="flex flex-col items-center justify-center p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#718096]">
                      % Geral de conformidade
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-heading)] text-[36px] font-bold text-[#0f62ac]">
                      {percentualGeralConformidade}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Critérios ── */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`overflow-hidden rounded-2xl border ${relatorio.cumpriuEliminatorios ? "border-emerald-200" : "border-red-200"}`}>
                  <div className={`px-4 py-2 ${relatorio.cumpriuEliminatorios ? "bg-emerald-600" : "bg-red-600"}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-white">Eliminatórios</p>
                  </div>
                  <div className={`px-4 py-3 ${relatorio.cumpriuEliminatorios ? "bg-emerald-50" : "bg-red-50"}`}>
                    <p className={`text-[15px] font-bold ${relatorio.cumpriuEliminatorios ? "text-emerald-700" : "text-red-700"}`}>
                      {relatorio.cumpriuEliminatorios ? "Cumpriu" : "Não cumpriu"}
                    </p>
                  </div>
                </div>
                <div className={`overflow-hidden rounded-2xl border ${relatorio.cumpriuClassificatorios ? "border-emerald-200" : "border-red-200"}`}>
                  <div className={`px-4 py-2 ${relatorio.cumpriuClassificatorios ? "bg-emerald-600" : "bg-red-600"}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-white">Classificatórios</p>
                  </div>
                  <div className={`px-4 py-3 ${relatorio.cumpriuClassificatorios ? "bg-emerald-50" : "bg-red-50"}`}>
                    <p className={`text-[15px] font-bold ${relatorio.cumpriuClassificatorios ? "text-emerald-700" : "text-red-700"}`}>
                      {relatorio.cumpriuClassificatorios ? "Cumpriu" : "Não cumpriu"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Gráfico de barras empilhadas ── */}
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="px-6 pt-6">
                  <SectionTitle>Conformidade por seção</SectionTitle>
                  <p className="mt-[-8px] text-[12px] text-[#718096]">Itens conformes vs. não conformes por área avaliada</p>
                </div>
                <div className="px-6 pb-6">
                  <div className="mt-5 h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                        barSize={20}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis
                          type="number"
                          tick={{ fontSize: 11, fill: "#718096" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          width={160}
                          tick={{ fontSize: 12, fill: "#2d3748", fontWeight: 500 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#edf2f7" }} />
                        <Legend
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{ fontSize: 12, paddingTop: 16, color: "#4a5568" }}
                          formatter={(value: string) => value === "conformes" ? "Conformes" : "Não conformes"}
                        />
                        <Bar dataKey="conformes" stackId="a" fill="#2b6cb0" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="naoConformes" stackId="a" fill="#e53e3e" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* ── Detalhamento por seção (PDF legend style) ── */}
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="px-6 pt-6">
                  <SectionTitle>Detalhamento por seção</SectionTitle>
                </div>
                <div className="divide-y divide-[#e2e8f0]">
                  {relatorio.secoes.map((s) => {
                    const conformes = s.totalItens - s.itensNaoConformes;
                    const pctConf = s.totalItens > 0 ? ((conformes / s.totalItens) * 100).toFixed(1) : "0";
                    return (
                      <div key={s.secao} className="px-6 py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="text-[14px] font-bold text-[#1a365d]">{formatSecaoNome(s.secaoNome)}</p>
                            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-[#718096]">
                              <span>Total de itens: <span className="font-semibold text-[#2d3748]">{s.totalItens}</span></span>
                              <span>Não conformes: <span className="font-semibold text-[#e53e3e]">{s.itensNaoConformes}</span></span>
                              <span>Conformidade: <span className="font-semibold text-[#2b6cb0]">{pctConf}%</span></span>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#718096]">Pontuação</p>
                            <p className="mt-0.5 text-[20px] font-bold text-[#1a365d]">{s.pontuacaoSecao.toFixed(1)}</p>
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-[#e2e8f0]">
                          <div
                            className="h-full rounded-full bg-[#2b6cb0] transition-all"
                            style={{ width: `${pctConf}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Categorização do serviço (PDF style) ── */}
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="px-6 pt-6">
                  <SectionTitle>Categorização do serviço</SectionTitle>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-[13px] leading-relaxed text-[#4a5568]">
                    {cat.desc === "Boas condições sanitárias" && "O estabelecimento apresenta baixo nível de não conformidades sanitárias, com pontuação inferior a 13,3 pontos. Indica que as boas práticas estão sendo seguidas adequadamente."}
                    {cat.desc === "Condições regulares — requer atenção" && "O estabelecimento apresenta nível intermediário de não conformidades, com pontuação entre 13,3 e 502,7 pontos. Requer atenção e implementação de melhorias para evitar riscos sanitários."}
                    {cat.desc === "Condições inadequadas — ação imediata" && "O estabelecimento apresenta alto nível de não conformidades, com pontuação igual ou superior a 502,7 pontos. Exige ação corretiva imediata para garantir a segurança alimentar."}
                    {cat.desc === "Aguardando processamento" && "O estabelecimento não cumpriu os critérios eliminatórios ou atingiu pontuação igual ou superior a 1152,4 pontos. A vigilância irá adotar medidas necessárias para que o serviço não continue operando nessas condições."}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { label: "A", range: "< 13,3", active: relatorio.categoria === "A", color: "bg-emerald-600" },
                      { label: "B", range: "13,3 – 502,7", active: relatorio.categoria === "B", color: "bg-amber-500" },
                      { label: "C", range: "502,7 – 1152,3", active: relatorio.categoria === "C", color: "bg-red-600" },
                      { label: "Pendente", range: "≥ 1152,4", active: relatorio.categoria === "Pendente", color: "bg-[#2d3748]" },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className={`rounded-xl px-3 py-2.5 text-center transition-all ${
                          c.active
                            ? `${c.color} text-white shadow-md`
                            : "bg-[#edf2f7] text-[#718096]"
                        }`}
                      >
                        <p className={`text-[14px] font-bold ${c.active ? "text-white" : "text-[#2d3748]"}`}>{c.label}</p>
                        <p className={`text-[11px] ${c.active ? "text-white/80" : "text-[#a0aec0]"}`}>{c.range}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setModalClassificacao(true)}
                    className="mt-4 text-[12px] font-semibold text-[#0f62ac] hover:underline"
                  >
                    Ver detalhes da classificação
                  </button>
                </div>
              </div>

              {/* ── Proposta de intervenção ── */}
              {relatorio.propostaIntervencao && (
                <div className="overflow-hidden rounded-2xl">
                  <div className="bg-[#dd6b20] px-6 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-white">
                      Proposta de intervenção
                    </p>
                  </div>
                  <div className="bg-orange-50 px-6 py-5">
                    <p className="text-[14px] leading-relaxed text-[#4a5568]">{relatorio.propostaIntervencao}</p>
                  </div>
                </div>
              )}

              {/* ── Footer ── */}
              <p className="pb-4 text-center text-[11px] text-[#a0aec0]">
                Relatório gerado em {new Date(relatorio.dataGeracao).toLocaleDateString("pt-BR")} · NutriSec — Sistema de avaliação de segurança alimentar
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
