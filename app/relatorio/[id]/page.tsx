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

const categoriaConfig = {
  A: { label: "Categoria A", color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", desc: "Boas condições sanitárias" },
  B: { label: "Categoria B", color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", desc: "Condições regulares — requer atenção" },
  C: { label: "Categoria C", color: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500", desc: "Condições inadequadas — ação imediata" },
  Pendente: { label: "Pendente", color: "bg-gray-50 text-gray-600 border-gray-200", dot: "bg-gray-400", desc: "Aguardando processamento" },
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const conformes = payload.find((p: any) => p.dataKey === "conformes")?.value ?? 0;
  const naoConformes = payload.find((p: any) => p.dataKey === "naoConformes")?.value ?? 0;
  const total = conformes + naoConformes;
  return (
    <div className="rounded-xl border border-[#e5eaf0] bg-white p-3 shadow-lg text-[13px]">
      <p className="font-semibold text-[#2e2e2e] mb-1">{label}</p>
      <p className="text-emerald-600">Conformes: {conformes} ({total > 0 ? ((conformes / total) * 100).toFixed(0) : 0}%)</p>
      <p className="text-red-500">Não conformes: {naoConformes} ({total > 0 ? ((naoConformes / total) * 100).toFixed(0) : 0}%)</p>
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

  const role = (user?.role?.toLowerCase() ?? "consultor") as "consultor" | "responsavel";

  useEffect(() => {
    apiFetch(`/api/avaliacoes/${id}/relatorio`)
      .then(setRelatorio)
      .catch((e) => setErro(e?.message ?? "Erro ao carregar relatório."))
      .finally(() => setLoading(false));
  }, [id]);

  const cat = relatorio ? categoriaConfig[relatorio.categoria] : null;

  const chartData = relatorio?.secoes.map((s) => ({
    name: s.secaoNome,
    conformes: s.totalItens - s.itensNaoConformes,
    naoConformes: s.itensNaoConformes,
  })) ?? [];

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
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

          {relatorio && cat && (
            <div className="max-w-[860px] space-y-4">
              {/* Header */}
              <div className="rounded-2xl border border-[#e5eaf0] bg-white p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">Relatório de Avaliação</p>
                    <h1 className="mt-1 font-[family-name:var(--font-heading)] text-[20px] font-bold text-[#2e2e2e]">
                      {relatorio.estabelecimentoNome}
                    </h1>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#9ca3af]">
                      <span>Avaliado em {new Date(relatorio.dataAvaliacao).toLocaleDateString("pt-BR")}</span>
                      <span>Consultor: {relatorio.consultorNome}</span>
                      <span>Gerado em {new Date(relatorio.dataGeracao).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                  <span className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-[13px] font-bold ${cat.color}`}>
                    <span className={`size-2 rounded-full ${cat.dot}`} />
                    {cat.label}
                  </span>
                </div>
                <p className={`mt-3 text-[13px] font-medium ${cat.color.split(" ")[1]}`}>{cat.desc}</p>
              </div>

              {/* Resumo */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-[#e5eaf0] bg-white p-4 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">Pontuação</p>
                  <p className="mt-1 text-[28px] font-bold text-[#2e2e2e]">{relatorio.pontuacaoTotal.toFixed(1)}</p>
                </div>
                <div className={`rounded-2xl border p-4 text-center ${relatorio.cumpriuEliminatorios ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">Eliminatórios</p>
                  <p className={`mt-1 text-[15px] font-bold ${relatorio.cumpriuEliminatorios ? "text-emerald-600" : "text-red-600"}`}>
                    {relatorio.cumpriuEliminatorios ? "Cumpriu" : "Não cumpriu"}
                  </p>
                </div>
                <div className={`rounded-2xl border p-4 text-center ${relatorio.cumpriuClassificatorios ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">Classificatórios</p>
                  <p className={`mt-1 text-[15px] font-bold ${relatorio.cumpriuClassificatorios ? "text-emerald-600" : "text-red-600"}`}>
                    {relatorio.cumpriuClassificatorios ? "Cumpriu" : "Não cumpriu"}
                  </p>
                </div>
              </div>

              {/* Gráfico de barras empilhadas */}
              <div className="rounded-2xl border border-[#e5eaf0] bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
                  Conformidade por seção
                </p>
                <p className="mt-1 text-[12px] text-[#9ca3af]">Itens conformes vs. não conformes por área avaliada</p>
                <div className="mt-6 h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      layout="vertical"
                      margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                      barSize={22}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f4f8" />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={160}
                        tick={{ fontSize: 12, fill: "#4b5563" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafb" }} />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
                        formatter={(value) => value === "conformes" ? "Conformes" : "Não conformes"}
                      />
                      <Bar dataKey="conformes" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="naoConformes" stackId="a" fill="#f87171" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Proposta de intervenção */}
              {relatorio.propostaIntervencao && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-600">Proposta de intervenção</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#4b5563]">{relatorio.propostaIntervencao}</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
