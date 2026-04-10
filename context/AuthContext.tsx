"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthUser, getUser, logout as doLogout } from "@/lib/auth";

const TERMS_VERSION = "v1";

function termsKey(email: string) {
  return `nutrisec_terms_${TERMS_VERSION}_${email}`;
}

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
  termsAccepted: boolean;
  acceptTerms: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  termsAccepted: false,
  acceptTerms: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    if (u) {
      setTermsAccepted(localStorage.getItem(termsKey(u.email)) === "true");
    }
  }, []);

  function logout() {
    doLogout();
    setUser(null);
    setTermsAccepted(false);
  }

  function acceptTerms() {
    if (user) {
      localStorage.setItem(termsKey(user.email), "true");
      setTermsAccepted(true);
    }
  }

  const showTerms = !!user && !termsAccepted;

  return (
    <AuthContext.Provider value={{ user, setUser, logout, termsAccepted, acceptTerms }}>
      {children}
      {showTerms && <TermsModal onAccept={acceptTerms} />}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

/* ───── Terms Modal ───── */

function TermsModal({ onAccept }: { onAccept: () => void }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="flex w-full max-w-[560px] flex-col rounded-2xl bg-white shadow-2xl max-h-[90vh]">
        {/* Header */}
        <div className="border-b border-[#e5eaf0] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#0f62ac]/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f62ac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#2e2e2e]">Termos de Uso e Privacidade</h2>
              <p className="text-[12px] text-[#9ca3af]">Leia e aceite para continuar</p>
            </div>
          </div>
        </div>

        {/* Conteúdo rolável */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-[13px] leading-relaxed text-[#4b5563] space-y-4">
          <div>
            <p className="font-semibold text-[#2e2e2e]">1. Sobre o sistema</p>
            <p className="mt-1">
              O NutriSec é um sistema digital de avaliação de boas práticas em serviços de alimentação, desenvolvido no âmbito de pesquisa da Universidade Federal Fluminense (UFF). Seu uso é restrito a usuários autorizados vinculados ao projeto.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#2e2e2e]">2. Coleta e uso de dados</p>
            <p className="mt-1">
              Os dados coletados — incluindo nome completo, e-mail, CPF e informações sobre estabelecimentos avaliados — são utilizados exclusivamente para fins de pesquisa científica e avaliação sanitária no contexto do projeto NutriSec. Nenhum dado é compartilhado com terceiros sem consentimento explícito.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#2e2e2e]">3. Conformidade com a LGPD</p>
            <p className="mt-1">
              O tratamento de dados pessoais nesta plataforma observa os princípios e disposições da Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Você tem direito ao acesso, correção e exclusão dos seus dados a qualquer momento, mediante solicitação ao administrador do sistema.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#2e2e2e]">4. Responsabilidades do usuário</p>
            <p className="mt-1">
              O usuário compromete-se a utilizar o sistema apenas para as finalidades previstas no projeto, manter suas credenciais de acesso em sigilo e não compartilhar informações confidenciais obtidas por meio da plataforma.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#2e2e2e]">5. Contato</p>
            <p className="mt-1">
              Para dúvidas, solicitações de dados ou suporte técnico, entre em contato com a equipe de desenvolvimento através da opção "Falar com suporte" disponível no sistema.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e5eaf0] px-6 py-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-[#0f62ac]"
            />
            <span className="text-[13px] text-[#4b5563]">
              Li e aceito os <span className="font-semibold text-[#2e2e2e]">Termos de Uso</span> e a{" "}
              <span className="font-semibold text-[#2e2e2e]">Política de Privacidade</span> do NutriSec.
            </span>
          </label>

          <button
            onClick={onAccept}
            disabled={!checked}
            className="mt-4 h-[40px] w-full rounded-full bg-[#0f62ac] text-[14px] font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-[#0f62ac]/90"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
