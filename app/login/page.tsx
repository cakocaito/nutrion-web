"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { validateEmail, validatePassword } from "@/lib/validators";
import { apiFetch } from "@/lib/api";

export default function Login() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recuperarAberto, setRecuperarAberto] = useState(false);
  const [recuperarEmail, setRecuperarEmail] = useState("");
  const [recuperarLoading, setRecuperarLoading] = useState(false);
  const [recuperarMsg, setRecuperarMsg] = useState("");

  useEffect(() => {
    router.prefetch("/home");
  }, [router]);

  useEffect(() => {
    if (user) router.replace("/home");
  }, [user, router]);

  async function handleRecuperar() {
    if (!recuperarEmail) return;
    setRecuperarLoading(true);
    setRecuperarMsg("");
    try {
      await apiFetch("/api/auth/recuperar-senha", {
        method: "POST",
        body: JSON.stringify({ email: recuperarEmail }),
      });
      setRecuperarMsg("Se o e-mail estiver cadastrado, você receberá as instruções em breve.");
    } catch {
      setRecuperarMsg("Erro ao enviar. Tente novamente.");
    } finally {
      setRecuperarLoading(false);
    }
  }

  async function handleLogin() {
    setError("");
    const emailErr = validateEmail(email);
    if (emailErr) { setError(emailErr); return; }
    const passErr = validatePassword(password);
    if (passErr) { setError(passErr); return; }

    setLoading(true);
    try {
      const user = await login(email, password);
      setUser(user);
      // mantém loading até a navegação acontecer via useEffect
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f1f8fc] px-4 py-8">
      <div className="pointer-events-none absolute -left-[82px] bottom-0 size-[268px] rounded-full bg-gradient-to-tr from-[#0f62ac]/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-[40px] top-[60px] size-[160px] rounded-full bg-gradient-to-bl from-[#0f62ac]/8 to-transparent blur-3xl" />

      <svg
        className="pointer-events-none absolute right-[40px] top-[100px] hidden h-[400px] w-[200px] lg:block"
        viewBox="0 0 200 400"
        fill="none"
      >
        <path
          d="M180 0 C 180 150, 20 150, 20 300 C 20 350, 60 400, 120 400"
          stroke="#0f62ac"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          opacity="0.2"
        />
        <path
          d="M160 20 C 160 160, 10 170, 30 320"
          stroke="#0f62ac"
          strokeWidth="1"
          strokeDasharray="6 5"
          opacity="0.15"
        />
      </svg>

      <div
        className="relative z-10 w-full max-w-[520px] rounded-[28px] border border-[#0f62ac]/15 p-8 shadow-[0px_12px_24px_-11px_rgba(187,187,187,0.25)] backdrop-blur-[7px] sm:max-w-[560px] sm:rounded-[35px] sm:p-10 md:p-12"
        style={{
          backgroundImage:
            "linear-gradient(98deg, rgba(255,255,255,0.66) 17%, rgba(255,255,255,0.26) 99%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex size-[50px] items-center justify-center rounded-md bg-[#0f62ac] sm:size-[60px]">
            <Image
              src="/images/uff-logo.png"
              alt="NutriSec UFF"
              width={44}
              height={22}
              className="h-[20px] w-[40px] object-contain brightness-0 invert sm:h-[27px] sm:w-[54px]"
            />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">
              NutriSec UFF
            </h1>
            <p className="text-[14px] font-medium text-black/60 sm:text-[16px]">
              Crie uma conta ou faça login
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <h2 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">
            Entrar
          </h2>

          <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5">
            <input
              type="email"
              placeholder="Continuar com o endereço de e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[50px] w-full rounded-full border border-[#9e9e9e]/24 bg-white px-6 text-[15px] font-medium text-[#2e2e2e] placeholder-[#a3b5bf] outline-none transition-colors focus:border-[#0f62ac]/40 sm:h-[55px] sm:text-[17px]"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="h-[50px] w-full rounded-full border border-[#9e9e9e]/24 bg-white px-6 text-[15px] font-medium text-[#2e2e2e] placeholder-[#a3b5bf] outline-none transition-colors focus:border-[#0f62ac]/40 sm:h-[55px] sm:text-[17px]"
            />

            {error && (
              <p className="px-2 text-[13px] font-medium text-red-500">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`h-[50px] w-full rounded-full text-[15px] font-semibold transition-colors disabled:opacity-50 sm:h-[55px] sm:text-[17px] ${
                email && password
                  ? "bg-[#0f62ac] text-white hover:bg-[#0f62ac]/90"
                  : "border border-[#9e9e9e]/24 bg-white text-[#a3b5bf] hover:border-[#0f62ac]/30 hover:text-[#0f62ac]"
              }`}
            >
              {loading ? "Entrando..." : "Continuar"}
            </button>

            <button
              type="button"
              onClick={() => { setRecuperarAberto(true); setRecuperarMsg(""); }}
              className="text-[13px] font-medium text-[#0f62ac] hover:underline"
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>

        {/* Modal recuperar senha */}
        {recuperarAberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-heading)] text-[17px] font-bold text-[#2e2e2e]">
                  Recuperar senha
                </h2>
                <button onClick={() => setRecuperarAberto(false)} className="text-[#9ca3af] hover:text-[#2e2e2e]">✕</button>
              </div>
              <p className="mt-2 text-[13px] text-[#6b7280]">
                Digite seu e-mail e enviaremos as instruções para redefinir sua senha.
              </p>
              <input
                type="email"
                placeholder="Seu e-mail"
                value={recuperarEmail}
                onChange={(e) => setRecuperarEmail(e.target.value)}
                className="mt-4 h-[44px] w-full rounded-lg border border-[#e5eaf0] bg-[#f8fafb] px-4 text-[13px] outline-none focus:border-[#0f62ac]/50"
              />
              {recuperarMsg && (
                <p className="mt-2 text-[12px] text-[#0f62ac]">{recuperarMsg}</p>
              )}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setRecuperarAberto(false)}
                  className="h-[38px] flex-1 rounded-full border border-[#e5eaf0] text-[13px] font-semibold text-[#6b7280] hover:bg-[#f8fafb]"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRecuperar}
                  disabled={recuperarLoading}
                  className="h-[38px] flex-1 rounded-full bg-[#0f62ac] text-[13px] font-semibold text-white hover:bg-[#0f62ac]/90 disabled:opacity-50"
                >
                  {recuperarLoading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center sm:mt-14">
          <div className="mb-6 h-px w-full bg-[#9e9e9e]/15 sm:mb-8" />
          <button
            onClick={() => router.push("/cadastro")}
            className="inline-flex h-[46px] w-[200px] items-center justify-center rounded-full bg-[#0f62ac] text-[14px] font-semibold text-white transition-colors hover:bg-[#0f62ac]/90 sm:h-[50px] sm:w-[226px] sm:text-[15px]"
          >
            Criar conta
          </button>
        </div>
      </div>

      <p className="relative z-10 mt-8 max-w-[500px] text-center text-[12px] font-medium leading-relaxed text-black/60 sm:mt-10 sm:text-[14px]">
        Ao iniciar sua conta, você deve aceitar os{" "}
        <a href="#termos" className="text-[#0f62ac] hover:underline">
          Termos de Privacidade
        </a>{" "}
        e os{" "}
        <a href="#uso" className="text-[#0f62ac] hover:underline">
          Termos de Uso
        </a>{" "}
        do nosso serviço.
      </p>
    </div>
  );
}
