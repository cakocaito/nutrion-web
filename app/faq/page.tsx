"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, MobileSidebar, TopBar } from "@/app/projeto/components";

const faqs = [
  {
    categoria: "Sobre o sistema",
    itens: [
      {
        pergunta: "O que é o NutriSec?",
        resposta:
          "O NutriSec é um sistema digital de avaliação de boas práticas em serviços de alimentação, desenvolvido por alunos do Instituto de Computação da UFF em parceria com a Faculdade de Nutrição. Ele digitaliza o processo de aplicação do checklist sanitário, integrando com o REDCap para coleta dos dados.",
      },
      {
        pergunta: "Quem pode usar o sistema?",
        resposta:
          "O sistema possui três perfis: Administrador (gerencia usuários e organizações), Consultor (cria e gerencia avaliações) e Responsável (acompanha as avaliações do seu estabelecimento). O acesso é feito por convite do administrador.",
      },
      {
        pergunta: "O sistema funciona em celular?",
        resposta:
          "Sim. O NutriSec é responsivo e pode ser acessado pelo navegador do celular ou tablet, com sidebar adaptada para telas menores.",
      },
    ],
  },
  {
    categoria: "Avaliações",
    itens: [
      {
        pergunta: "Como funciona o processo de avaliação?",
        resposta:
          "O consultor cria uma avaliação informando o CNPJ do estabelecimento e a data agendada. O sistema gera um código (id_pesquisa) que deve ser inserido no formulário do REDCap durante a visita. Após o preenchimento, o sistema processa os dados automaticamente e gera o relatório.",
      },
      {
        pergunta: "O que é o id_pesquisa?",
        resposta:
          "É o identificador único da avaliação gerado pelo NutriSec. Deve ser preenchido no campo 'id_pesquisa' do formulário REDCap durante a aplicação do checklist. Sem esse código, o sistema não consegue vincular os dados ao estabelecimento correto.",
      },
      {
        pergunta: "Quanto tempo leva para o relatório aparecer após preencher o REDCap?",
        resposta:
          "O sistema sincroniza com o REDCap automaticamente a cada 5 minutos. Após o preenchimento completo do formulário no REDCap, o relatório deve aparecer em até 10 minutos.",
      },
      {
        pergunta: "Posso cancelar uma avaliação agendada?",
        resposta:
          "Sim. Enquanto a avaliação estiver com status 'Agendada', o consultor pode cancelá-la clicando no ícone de X no card da avaliação. Após iniciada ou concluída, não é possível cancelar.",
      },
    ],
  },
  {
    categoria: "Relatório",
    itens: [
      {
        pergunta: "O que significam as categorias A, B e C?",
        resposta:
          "As categorias refletem o nível de conformidade sanitária do estabelecimento. Categoria A indica boas condições sanitárias (menor pontuação de não conformidades). Categoria B indica condições regulares que requerem atenção. Categoria C indica condições inadequadas que exigem ação imediata.",
      },
      {
        pergunta: "O que são itens eliminatórios e classificatórios?",
        resposta:
          "Itens eliminatórios são critérios críticos relacionados ao abastecimento de água — o não cumprimento independe da pontuação geral e pode rebaixar a classificação para 'Pendente'. Itens classificatórios são critérios relevantes cuja não conformidade pode impactar a categoria final.",
      },
      {
        pergunta: "Como exportar o relatório em PDF?",
        resposta:
          "Na página do relatório, clique no botão 'Exportar PDF' no canto superior direito. O navegador abrirá o diálogo de impressão — selecione 'Salvar como PDF' como destino.",
      },
      {
        pergunta: "O responsável consegue ver o relatório?",
        resposta:
          "Sim. O responsável tem acesso ao relatório das avaliações vinculadas ao seu estabelecimento. Quando disponível, o botão 'Ver relatório' aparece no card da avaliação.",
      },
    ],
  },
  {
    categoria: "Conta e acesso",
    itens: [
      {
        pergunta: "Como me cadastrar no sistema?",
        resposta:
          "O cadastro é feito por convite. O administrador gera um código de convite que é enviado por e-mail. Ao acessar o link de cadastro, você informa o código recebido junto com seus dados.",
      },
      {
        pergunta: "Esqueci minha senha. O que fazer?",
        resposta:
          "Entre em contato com o administrador do sistema para redefinição de senha. A opção de recuperação por e-mail está prevista para versões futuras.",
      },
      {
        pergunta: "Como entrar em contato com o suporte?",
        resposta:
          "Clique no seu avatar no canto superior direito e selecione 'Falar com suporte'. Você será direcionado para uma conversa no WhatsApp com a equipe de desenvolvimento.",
      },
    ],
  },
];

function FaqItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="border-b border-[#e5eaf0] last:border-0">
      <button
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[14px] font-semibold text-[#2e2e2e]">{pergunta}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 ${aberto ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {aberto && (
        <p className="pb-4 text-[13px] leading-relaxed text-[#4b5563]">{resposta}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = (user?.role?.toLowerCase() ?? "consultor") as "consultor" | "responsavel";

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      <div className="hidden lg:block">
        <Sidebar
          role={role}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
      <MobileSidebar role={role} open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-[240px]"}`}>
        <TopBar role={role} onMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-[700px]">
            <h1 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[#2e2e2e] sm:text-[26px]">
              Perguntas frequentes
            </h1>
            <p className="mt-0.5 text-[14px] text-[#6b7280]">
              Tire suas dúvidas sobre o NutriSec
            </p>

            <div className="mt-6 space-y-4">
              {faqs.map((cat) => (
                <div key={cat.categoria} className="rounded-2xl border border-[#e5eaf0] bg-white px-6 py-2">
                  <p className="border-b border-[#e5eaf0] py-3 text-[11px] font-semibold uppercase tracking-widest text-[#0f62ac]">
                    {cat.categoria}
                  </p>
                  {cat.itens.map((item) => (
                    <FaqItem key={item.pergunta} pergunta={item.pergunta} resposta={item.resposta} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
