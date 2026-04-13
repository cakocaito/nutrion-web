import Image from "next/image";
import Link from "next/link";

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

const locais = [
  "Navio de Pesquisa em Ciências do Mar — UFF",
  "Coluni UFF",
  "Restaurante Universitário da UFF",
  "Batalhão da Polícia Militar do Rio de Janeiro",
];

const classificacoes = [
  {
    label: "Categoria A",
    color: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
    desc: "Boas condições sanitárias. Pontuação < 13,3.",
  },
  {
    label: "Categoria B",
    color: "border-amber-200 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
    desc: "Condições regulares. Pontuação entre 13,3 e 502,7.",
  },
  {
    label: "Categoria C",
    color: "border-red-200 bg-red-50 text-red-700",
    dot: "bg-red-500",
    desc: "Condições inadequadas. Pontuação ≥ 502,7.",
  },
  {
    label: "Pendente",
    color: "border-gray-200 bg-gray-50 text-gray-600",
    dot: "bg-gray-400",
    desc: "Critério eliminatório não cumprido ou pontuação ≥ 1152,4.",
  },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-[#f8fafb]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#e5eaf0] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-[60px] max-w-[1100px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-[36px] items-center justify-center rounded-md bg-[#0f62ac]">
              <Image
                src="/images/uff-logo.png"
                alt="NutriSec"
                width={28}
                height={14}
                className="h-[14px] w-[28px] object-contain brightness-0 invert"
              />
            </div>
            <span className="font-[family-name:var(--font-heading)] text-[18px] font-bold tracking-tight text-[#2e2e2e]">
              NutriSec
            </span>
          </Link>
          <Link
            href="/login"
            className="inline-flex h-[36px] items-center justify-center rounded-full bg-[#0f62ac] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90"
          >
            Começar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero section */}
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] font-bold leading-tight tracking-[-1px] text-[#2e2e2e] sm:text-[36px] sm:tracking-[-1.5px]">
            Sobre o <span className="text-[#0f62ac]">NutriSec</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[640px] text-[14px] leading-relaxed text-[#6b7280] sm:text-[15px]">
            Sistema digital de avaliação de segurança alimentar desenvolvido na
            Universidade Federal Fluminense.
          </p>
        </div>

        {/* O Projeto */}
        <section className="mt-10 rounded-2xl border border-[#e5eaf0] bg-white p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
            O Projeto
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[#4b5563] sm:text-[15px]">
            As Doenças de Transmissão Hídrica e Alimentar (DTHA) estão entre as
            principais causas de morbidade e mortalidade em nível global — cerca
            de{" "}
            <span className="font-semibold text-[#2e2e2e]">
              420.000 pessoas morrem anualmente
            </span>{" "}
            vítimas de DTHA, segundo a Organização Mundial da Saúde. As Boas
            Práticas são obrigatórias para a garantia da segurança dos
            alimentos, sendo o checklist um instrumento essencial para avaliar
            não conformidades e riscos sanitários em serviços de alimentação.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[#4b5563] sm:text-[15px]">
            O <span className="font-semibold text-[#2e2e2e]">NutriSec</span> é
            um sistema digital de avaliação desenvolvido para os serviços de
            alimentação da Universidade Federal Fluminense. Ele permite que
            consultores realizem avaliações de Boas Práticas utilizando
            checklists padronizados integrados ao REDCap, e que responsáveis
            técnicos acompanhem os resultados e relatórios de classificação dos
            seus estabelecimentos.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[#4b5563] sm:text-[15px]">
            O sistema transforma dados coletados em campo em relatórios visuais
            com classificações sanitárias automáticas, facilitando a tomada de
            decisão e o cumprimento das exigências regulatórias. O projeto é
            fruto de uma pesquisa interdisciplinar envolvendo as áreas de
            Nutrição, Estatística e Computação da UFF, publicada na Revista
            PIBIC UFF 2024.
          </p>

          {/* Article link */}
          <a
            href="https://revistapibic.uff.br/wp-content/uploads/sites/343/2026/01/RevistaPIBIC2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-3 rounded-xl border border-[#0f62ac]/20 bg-[#0f62ac]/5 px-4 py-3 transition-colors hover:bg-[#0f62ac]/10"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0f62ac]/15">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0f62ac"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#0f62ac]">
                Artigo publicado — Revista PIBIC UFF 2024
              </p>
              <p className="text-[12px] text-[#6b7280]">
                Versão anterior do projeto · revistapibic.uff.br
              </p>
            </div>
            <svg
              className="ml-auto shrink-0 text-[#0f62ac]"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {/* Onde já foi utilizado */}
          <section className="rounded-2xl border border-[#e5eaf0] bg-white p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
              Onde já foi utilizado
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {locais.map((local) => (
                <li
                  key={local}
                  className="flex items-start gap-2 text-[13px] text-[#4b5563]"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#0f62ac]" />
                  {local}
                </li>
              ))}
            </ul>
          </section>

          {/* Como funciona */}
          <section className="rounded-2xl border border-[#e5eaf0] bg-white p-6 lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
              Como funciona
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Agendar avaliação",
                  desc: "O responsável técnico solicita uma avaliação de Boas Práticas para seu estabelecimento.",
                },
                {
                  step: "2",
                  title: "Coletar dados",
                  desc: "O consultor aplica o checklist padronizado via REDCap Mobile durante a visita técnica.",
                },
                {
                  step: "3",
                  title: "Gerar relatório",
                  desc: "O sistema calcula a classificação sanitária automaticamente e gera um relatório visual.",
                },
              ].map((item) => (
                <div key={item.step} className="rounded-xl bg-[#f8fafb] p-4">
                  <div className="flex size-7 items-center justify-center rounded-full bg-[#0f62ac] text-[12px] font-bold text-white">
                    {item.step}
                  </div>
                  <p className="mt-3 text-[13px] font-semibold text-[#2e2e2e]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#6b7280]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sistema de classificação */}
        <section className="mt-4 rounded-2xl border border-[#e5eaf0] bg-white p-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
            Sistema de classificação
          </p>
          <p className="mt-1 text-[12px] text-[#9ca3af]">
            Resultado gerado após o preenchimento do checklist no REDCap
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {classificacoes.map((c) => (
              <div
                key={c.label}
                className={`rounded-xl border p-4 ${c.color}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${c.dot}`} />
                  <span className="text-[13px] font-bold">{c.label}</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed opacity-80">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pesquisadores */}
        <section className="mt-4 rounded-2xl border border-[#e5eaf0] bg-white p-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
            Pesquisadores envolvidos
          </p>
          <p className="mt-1 text-[12px] text-[#9ca3af]">
            Autores do estudo publicado na Revista PIBIC UFF 2024
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {pesquisadores.map((p) => (
              <div key={p.nome} className="rounded-xl bg-[#f8fafb] px-3 py-2.5">
                <p className="text-[13px] font-semibold leading-snug text-[#2e2e2e]">
                  {p.nome}
                </p>
                <p className="mt-0.5 text-[11px] text-[#9ca3af]">
                  Fac. de {p.faculdade}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-[#0f62ac]/15 bg-[#0f62ac]/5 p-8 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-[20px] font-bold text-[#2e2e2e] sm:text-[24px]">
            Pronto para começar?
          </h2>
          <p className="max-w-[460px] text-[14px] text-[#6b7280]">
            Crie sua conta como responsável técnico ou consultor e comece a
            avaliar a segurança alimentar dos seus estabelecimentos.
          </p>
          <Link
            href="/login"
            className="inline-flex h-[44px] items-center justify-center rounded-full bg-[#0f62ac] px-8 text-[14px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90"
          >
            Começar agora
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-[12px] text-[#c4cdd6]">
          Desenvolvido por João Gabriel Otogali e Caio Marcio da Silva · Alunos
          do Instituto de Computação — UFF, 2026
        </p>
      </main>
    </div>
  );
}
