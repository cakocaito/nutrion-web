"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

function RedefinirSenhaForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (!email || !token) router.replace("/login");
  }, [email, token, router]);

  async function handleRedefinir() {
    setErro("");
    if (novaSenha.length < 8) { setErro("A senha deve ter pelo menos 8 caracteres."); return; }
    if (novaSenha !== confirmar) { setErro("As senhas não coincidem."); return; }

    setLoading(true);
    try {
      await apiFetch("/api/auth/redefinir-senha", {
        method: "POST",
        body: JSON.stringify({ email, token, novaSenha }),
      });
      setSucesso(true);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Link inválido ou expirado. Solicite um novo.");
    } finally {
      setLoading(false);
    }
  }

  if (sucesso) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f1f8fc] px-4">
        <div className="w-full max-w-[440px] rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-[20px] font-bold text-[#2e2e2e]">
            Senha redefinida!
          </h2>
          <p className="mt-2 text-[14px] text-[#6b7280]">
            Sua senha foi atualizada com sucesso.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="mt-6 h-[44px] w-full rounded-full bg-[#0f62ac] text-[14px] font-semibold text-white hover:bg-[#0f62ac]/90"
          >
            Ir para o login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1f8fc] px-4">
      <div className="w-full max-w-[440px] rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[#2e2e2e]">
          Redefinir senha
        </h2>
        <p className="mt-1 text-[13px] text-[#6b7280]">
          Digite e confirme sua nova senha.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nova senha (mínimo 8 caracteres)"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className="h-[44px] w-full rounded-lg border border-[#e5eaf0] bg-[#f8fafb] px-4 text-[13px] outline-none focus:border-[#0f62ac]/50"
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRedefinir()}
            className="h-[44px] w-full rounded-lg border border-[#e5eaf0] bg-[#f8fafb] px-4 text-[13px] outline-none focus:border-[#0f62ac]/50"
          />
          {erro && <p className="text-[12px] text-red-500">{erro}</p>}
          <button
            onClick={handleRedefinir}
            disabled={loading}
            className="h-[44px] w-full rounded-full bg-[#0f62ac] text-[14px] font-semibold text-white hover:bg-[#0f62ac]/90 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <Suspense>
      <RedefinirSenhaForm />
    </Suspense>
  );
}
