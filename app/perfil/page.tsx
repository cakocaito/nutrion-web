"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, MobileSidebar, TopBar } from "@/app/projeto/components";
import { apiFetch } from "@/lib/api";

export default function PerfilPage() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  const role = user?.role?.toLowerCase() as "consultor" | "responsavel" | undefined;

  async function handleAlterarSenha() {
    setErro(null);
    setSucesso(false);

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (novaSenha.length < 6) {
      setErro("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro("A nova senha e a confirmação não coincidem.");
      return;
    }

    setSalvando(true);
    try {
      await apiFetch("/api/auth/senha", {
        method: "PUT",
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });
      setSucesso(true);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao alterar senha.");
    } finally {
      setSalvando(false);
    }
  }

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
            <div className="mt-6 rounded-2xl border border-[#e5eaf0] bg-white p-6">
              <h2 className="text-[15px] font-bold text-[#2e2e2e]">Dados da conta</h2>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">Nome completo</p>
                  <p className="mt-1 text-[15px] font-medium text-[#2e2e2e]">{user?.nomeCompleto ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">E-mail</p>
                  <p className="mt-1 text-[15px] font-medium text-[#2e2e2e]">{user?.email ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">Perfil de acesso</p>
                  <span className="mt-1 inline-block rounded-full bg-[#0f62ac]/10 px-3 py-1 text-[13px] font-semibold text-[#0f62ac]">
                    {user?.role ?? "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Alterar senha */}
            <div className="mt-4 rounded-2xl border border-[#e5eaf0] bg-white p-6">
              <h2 className="text-[15px] font-bold text-[#2e2e2e]">Alterar senha</h2>
              <p className="mt-1 text-[13px] text-[#6b7280]">
                Use uma senha com pelo menos 6 caracteres.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#6b7280]">
                    Senha atual
                  </label>
                  <input
                    type="password"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                    className="h-[40px] w-full rounded-lg border border-[#e5eaf0] px-3 text-[14px] text-[#2e2e2e] outline-none transition-colors focus:border-[#0f62ac]/40"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#6b7280]">
                    Nova senha
                  </label>
                  <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    className="h-[40px] w-full rounded-lg border border-[#e5eaf0] px-3 text-[14px] text-[#2e2e2e] outline-none transition-colors focus:border-[#0f62ac]/40"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#6b7280]">
                    Confirmar nova senha
                  </label>
                  <input
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAlterarSenha()}
                    className="h-[40px] w-full rounded-lg border border-[#e5eaf0] px-3 text-[14px] text-[#2e2e2e] outline-none transition-colors focus:border-[#0f62ac]/40"
                  />
                </div>

                {erro && (
                  <p className="text-[13px] font-medium text-[#f25050]">{erro}</p>
                )}
                {sucesso && (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <p className="text-[13px] font-medium text-emerald-700">Senha alterada com sucesso.</p>
                  </div>
                )}

                <button
                  onClick={handleAlterarSenha}
                  disabled={salvando}
                  className="mt-1 h-[40px] w-full rounded-full bg-[#0f62ac] text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90 disabled:opacity-50 sm:w-auto sm:px-8"
                >
                  {salvando ? "Salvando..." : "Salvar nova senha"}
                </button>
              </div>
            </div>

            {/* Privacidade */}
            <div className="mt-4 rounded-2xl border border-[#e5eaf0] bg-white p-6">
              <h2 className="text-[15px] font-bold text-[#2e2e2e]">Privacidade e dados</h2>
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
