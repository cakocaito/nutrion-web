"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, MobileSidebar, TopBar } from "@/app/projeto/components";

const passos = [
  {
    numero: 1,
    titulo: "Baixe o REDCap Mobile",
    descricao:
      "Instale o aplicativo REDCap no seu celular. Disponível gratuitamente para Android e iOS.",
    acao: (
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href="https://play.google.com/store/apps/details?id=edu.vanderbilt.redcap"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-[#e5eaf0] bg-white px-4 py-2 text-[13px] font-semibold text-[#2e2e2e] transition-colors hover:border-[#0f62ac]/30 hover:text-[#0f62ac]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.18 23.76a2 2 0 001.94-.21l11.82-6.83-2.8-2.8-10.96 9.84zM.1 1.08A2 2 0 000 1.76v20.48c0 .24.04.47.1.68l.06.06 11.46-11.46v-.28L.16 1.02.1 1.08zM20.8 10.37l-3.36-1.94-3.12 3.12 3.12 3.12 3.38-1.95a2 2 0 000-2.35zM5.12.45L16.94 7.3l-2.8 2.8L3.18.24A2 2 0 005.12.45z" />
          </svg>
          Google Play
        </a>
        <a
          href="https://apps.apple.com/app/redcap-mobile-app/id972760477"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-[#e5eaf0] bg-white px-4 py-2 text-[13px] font-semibold text-[#2e2e2e] transition-colors hover:border-[#0f62ac]/30 hover:text-[#0f62ac]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          App Store
        </a>
      </div>
    ),
  },
  {
    numero: 2,
    titulo: "Entre em contato com o administrador",
    descricao:
      "Para acessar o projeto NutriSec no REDCap Mobile, você precisa de um token de acesso. Solicite ao administrador do sistema — ele liberará o token específico do projeto para você.",
    destaque: "Sem o token, não é possível baixar o projeto no aplicativo.",
  },
  {
    numero: 3,
    titulo: "Adicione o projeto no app",
    descricao:
      "Abra o REDCap Mobile, toque em \"Novo projeto\" e insira o token fornecido pelo administrador. O projeto NutriSec será baixado para o seu dispositivo e ficará disponível offline.",
  },
  {
    numero: 4,
    titulo: "Crie um novo registro",
    descricao:
      "Dentro do projeto, toque em \"Novo registro\" para iniciar o preenchimento do checklist. No campo id_pesquisa, insira o código gerado pelo NutriSec para a avaliação correspondente.",
    destaque: "O id_pesquisa é essencial — sem ele o sistema não consegue vincular o checklist ao estabelecimento correto.",
  },
  {
    numero: 5,
    titulo: "Preencha o checklist",
    descricao:
      "Percorra todos os itens do formulário durante a visita ao estabelecimento. O app funciona offline — você pode preencher sem conexão com a internet.",
  },
  {
    numero: 6,
    titulo: "Envie os registros ao servidor",
    descricao:
      "Após concluir o preenchimento, toque em \"Enviar registros ao servidor\". Selecione os registros que deseja enviar e confirme. É necessário ter conexão com a internet neste momento.",
  },
  {
    numero: 7,
    titulo: "Aguarde o relatório",
    descricao:
      "O NutriSec sincroniza com o REDCap automaticamente a cada 5 minutos. Após o envio, o relatório com a classificação do estabelecimento será gerado e ficará disponível no sistema em até 10 minutos.",
  },
];

export default function RedcapPage() {
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
          <div className="max-w-[680px]">
            <h1 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[#2e2e2e] sm:text-[26px]">
              Como usar o REDCap Mobile
            </h1>
            <p className="mt-0.5 text-[14px] text-[#6b7280]">
              Passo a passo para aplicar o checklist NutriSec em campo
            </p>

            <div className="mt-6 space-y-3">
              {passos.map((passo) => (
                <div key={passo.numero} className="rounded-2xl border border-[#e5eaf0] bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0f62ac] text-[13px] font-bold text-white">
                      {passo.numero}
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-[#2e2e2e]">{passo.titulo}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-[#4b5563]">{passo.descricao}</p>
                      {passo.destaque && (
                        <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] font-medium text-amber-700">
                          ⚠ {passo.destaque}
                        </div>
                      )}
                      {passo.acao}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dúvidas */}
            <div className="mt-4 rounded-2xl border border-[#e5eaf0] bg-white p-5">
              <p className="text-[13px] font-semibold text-[#2e2e2e]">Ainda com dúvidas?</p>
              <p className="mt-1 text-[13px] text-[#6b7280]">
                Consulte as <a href="/faq" className="font-semibold text-[#0f62ac] hover:underline">perguntas frequentes</a> ou entre em contato com o suporte pelo ícone de perfil no canto superior direito.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
