"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, MobileSidebar, TopBar } from "@/app/projeto/components";

export default function PerfilPage() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = user?.role?.toLowerCase() as "consultor" | "responsavel" | undefined;

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      <div className="hidden lg:block">
        <Sidebar
          role={role ?? "consultor"}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <MobileSidebar
        role={role ?? "consultor"}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-[240px]"}`}
      >
        <TopBar
          role={role ?? "consultor"}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-[600px]">
            <h1 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[#2e2e2e] sm:text-[26px]">
              Meu Perfil
            </h1>
            <p className="mt-1 text-[14px] font-medium text-[#6b7280]">
              Informações da sua conta
            </p>

            {/* Dados da conta */}
            <div className="mt-6 rounded-2xl border border-[#0f62ac]/15 bg-white p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-[#2e2e2e]">
                Dados da conta
              </h2>

              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Nome completo</p>
                  <p className="mt-1 text-[15px] font-medium text-[#2e2e2e]">{user?.nomeCompleto ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">E-mail</p>
                  <p className="mt-1 text-[15px] font-medium text-[#2e2e2e]">{user?.email ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Perfil de acesso</p>
                  <span className="mt-1 inline-block rounded-full bg-[#0f62ac]/10 px-3 py-1 text-[13px] font-semibold text-[#0f62ac]">
                    {user?.role ?? "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Alterar senha */}
            <div className="mt-4 rounded-2xl border border-[#0f62ac]/15 bg-white p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-[#2e2e2e]">
                Alterar senha
              </h2>
              <p className="mt-1 text-[13px] text-[#6b7280]">
                Para alterar sua senha, entre em contato com o administrador do sistema.
              </p>
            </div>

            {/* Privacidade */}
            <div className="mt-4 rounded-2xl border border-[#0f62ac]/15 bg-white p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-[#2e2e2e]">
                Privacidade e dados
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6b7280]">
                Seus dados são utilizados exclusivamente para fins de avaliação de segurança alimentar no âmbito do projeto NutriSec, em conformidade com a LGPD (Lei nº 13.709/2018). Para solicitações de exclusão ou portabilidade de dados, entre em contato com o administrador.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
