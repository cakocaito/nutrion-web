"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { validateEmail, validatePassword } from "@/lib/validators";

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      router.push("/home");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login.");
    } finally {
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
              alt="NutriSec"
              width={44}
              height={22}
              className="h-[20px] w-[40px] object-contain brightness-0 invert sm:h-[27px] sm:w-[54px]"
            />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">
              NutriSec
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
              className="h-[50px] w-full rounded-full border border-[#9e9e9e]/24 bg-white text-[15px] font-semibold text-[#a3b5bf] transition-colors hover:border-[#0f62ac]/30 hover:text-[#0f62ac] disabled:opacity-50 sm:h-[55px] sm:text-[17px]"
            >
              {loading ? "Entrando..." : "Continuar"}
            </button>
          </div>
        </div>

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
