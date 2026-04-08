"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/register";

const inputClass =
  "h-[50px] w-full rounded-full border border-[#9e9e9e]/24 bg-white px-6 text-[15px] font-medium text-[#2e2e2e] placeholder-[#a3b5bf] outline-none transition-colors focus:border-[#0f62ac]/40 sm:h-[55px] sm:text-[17px]";


export default function CadastroResponsavel() {
  const router = useRouter();
  const [form, setForm] = useState({
    codigoConvite: "",
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (!form.codigoConvite || !form.nomeCompleto || !form.cpf || !form.dataNascimento || !form.email || !form.password) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await register({
        codigoConvite: form.codigoConvite,
        tipoUsuario: "Responsavel",
        nomeCompleto: form.nomeCompleto,
        cpf: form.cpf,
        dataNascimento: form.dataNascimento,
        email: form.email,
        password: form.password,
      });
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f1f8fc] px-4 py-8">
      <div className="pointer-events-none absolute -left-[82px] bottom-0 size-[268px] rounded-full bg-gradient-to-tr from-[#0f62ac]/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-[40px] top-[60px] size-[160px] rounded-full bg-gradient-to-bl from-[#0f62ac]/8 to-transparent blur-3xl" />

      <button
        onClick={() => router.push("/cadastro")}
        className="absolute left-6 top-6 z-20 flex size-10 items-center justify-center rounded-full text-[#2e2e2e] transition-colors hover:bg-white/50 sm:left-10 sm:top-10 md:left-[120px] md:top-[140px]"
        aria-label="Voltar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        className="relative z-10 w-full max-w-[520px] rounded-[28px] border border-[#0f62ac]/15 p-8 shadow-[0px_12px_24px_-11px_rgba(187,187,187,0.25)] backdrop-blur-[7px] sm:max-w-[560px] sm:rounded-[35px] sm:p-10 md:p-12"
        style={{ backgroundImage: "linear-gradient(98deg, rgba(255,255,255,0.66) 17%, rgba(255,255,255,0.26) 99%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex size-[50px] items-center justify-center rounded-md bg-[#0f62ac] sm:size-[60px]">
            <Image src="/images/uff-logo.png" alt="NutriSec" width={44} height={22} className="h-[20px] w-[40px] object-contain brightness-0 invert sm:h-[27px] sm:w-[54px]" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">NutriSec</h1>
            <p className="text-[14px] font-medium text-black/60 sm:text-[16px]">Crie uma conta ou faça login</p>
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <h2 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">Cadastro — Responsável</h2>
          <p className="mt-1 text-[14px] font-medium text-black/60 sm:text-[16px]">Responsável pela unidade de refeição avaliada.</p>

          <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5">
            <input type="text" placeholder="Código de convite" value={form.codigoConvite} onChange={(e) => set("codigoConvite", e.target.value)} className={inputClass} />
            <input type="text" placeholder="Nome completo" value={form.nomeCompleto} onChange={(e) => set("nomeCompleto", e.target.value)} className={inputClass} />
            <input type="text" placeholder="CPF (somente números)" value={form.cpf} onChange={(e) => set("cpf", e.target.value)} className={inputClass} />
            <input type="date" placeholder="Data de nascimento" value={form.dataNascimento} onChange={(e) => set("dataNascimento", e.target.value)} className={inputClass} />
            <input type="email" placeholder="E-mail" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />
            <input type="password" placeholder="Senha" value={form.password} onChange={(e) => set("password", e.target.value)} className={inputClass} />
            <input type="password" placeholder="Confirmar senha" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} className={inputClass} />

{error && <p className="px-2 text-[13px] font-medium text-red-500">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-2 h-[50px] w-full rounded-full border border-[#9e9e9e]/24 bg-white text-[15px] font-semibold text-[#a3b5bf] transition-colors hover:border-[#0f62ac]/30 hover:text-[#0f62ac] disabled:opacity-50 sm:h-[55px] sm:text-[17px]"
            >
              {loading ? "Cadastrando..." : "Continuar"}
            </button>
          </div>
        </div>
      </div>

      <p className="relative z-10 mt-8 max-w-[500px] text-center text-[12px] font-medium leading-relaxed text-black/60 sm:mt-10 sm:text-[14px]">
        Ao iniciar sua conta, você deve aceitar os{" "}
        <a href="#termos" className="text-[#0f62ac] hover:underline">Termos de Privacidade</a>{" "}e os{" "}
        <a href="#uso" className="text-[#0f62ac] hover:underline">Termos de Uso</a> do nosso serviço.
      </p>
    </div>
  );
}
