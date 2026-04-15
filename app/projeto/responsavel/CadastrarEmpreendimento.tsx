"use client";

import Image from "next/image";
import { useState } from "react";
import { criarEstabelecimento } from "@/lib/empresas";
import {
  maskCEP,
  maskTelefone,
  validateCEP,
  validateTelefone,
  validateEmail,
  validateRequired,
} from "@/lib/validators";

const inputClass =
  "h-[50px] w-full rounded-full border border-[#9e9e9e]/24 bg-white px-6 text-[15px] font-medium text-[#2e2e2e] placeholder-[#a3b5bf] outline-none transition-colors focus:border-[#0f62ac]/40 sm:h-[55px] sm:text-[17px]";

const inputErrorClass =
  "h-[50px] w-full rounded-full border border-red-400 bg-white px-6 text-[15px] font-medium text-[#2e2e2e] placeholder-[#a3b5bf] outline-none transition-colors focus:border-red-500 sm:h-[55px] sm:text-[17px]";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="-mt-2 px-6 text-[12px] font-medium text-red-500">{msg}</p>;
}

export default function CadastrarEmpreendimento({
  empresaId,
  onVoltar,
  onSucesso,
}: {
  empresaId: number;
  onVoltar: () => void;
  onSucesso: () => void;
}) {
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    cep: "",
    telefone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};

    const nomeErr = validateRequired(form.nome, "Nome do estabelecimento");
    if (nomeErr) e.nome = nomeErr;

    const enderecoErr = validateRequired(form.endereco, "Endereço");
    if (enderecoErr) e.endereco = enderecoErr;

    const cepErr = validateCEP(form.cep);
    if (cepErr) e.cep = cepErr;

    const telErr = validateTelefone(form.telefone);
    if (telErr) e.telefone = telErr;

    const emailErr = validateEmail(form.email);
    if (emailErr) e.email = emailErr;

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await criarEstabelecimento({
        nome: form.nome,
        endereco: form.endereco,
        cep: form.cep.replace(/\D/g, ""),
        telefone: form.telefone.replace(/\D/g, ""),
        email: form.email,
        empresaId,
      });
      onSucesso();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao cadastrar empreendimento."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f1f8fc] px-4 py-8">
      <div className="pointer-events-none absolute -left-[82px] bottom-0 size-[268px] rounded-full bg-gradient-to-tr from-[#0f62ac]/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-[40px] top-[60px] size-[160px] rounded-full bg-gradient-to-bl from-[#0f62ac]/8 to-transparent blur-3xl" />

      {/* Back button */}
      <button
        onClick={onVoltar}
        className="absolute left-6 top-6 z-20 flex size-10 items-center justify-center rounded-full text-[#2e2e2e] transition-colors hover:bg-white/50 sm:left-10 sm:top-10 md:left-[120px] md:top-[140px]"
        aria-label="Voltar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[520px] rounded-[28px] border border-[#0f62ac]/15 p-8 shadow-[0px_12px_24px_-11px_rgba(187,187,187,0.25)] backdrop-blur-[7px] sm:max-w-[560px] sm:rounded-[35px] sm:p-10 md:p-12"
        style={{
          backgroundImage:
            "linear-gradient(98deg, rgba(255,255,255,0.66) 17%, rgba(255,255,255,0.26) 99%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex size-[50px] items-center justify-center rounded-md bg-[#0f62ac] sm:size-[60px]">
            <Image src="/images/uff-logo.png" alt="NutriSec" width={44} height={22} className="h-[20px] w-[40px] object-contain brightness-0 invert sm:h-[27px] sm:w-[54px]" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">NutriSec</h1>
            <p className="text-[14px] font-medium text-black/60 sm:text-[16px]">Novo empreendimento</p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 sm:mt-10">
          <h2 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">Cadastrar empreendimento</h2>
          <p className="mt-1 text-[14px] font-medium text-black/60 sm:text-[16px]">Preencha os dados do estabelecimento.</p>

          <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5">
            <input type="text" placeholder="Nome do estabelecimento" value={form.nome} onChange={(e) => set("nome", e.target.value)} className={errors.nome ? inputErrorClass : inputClass} />
            <FieldError msg={errors.nome} />

            <input type="text" placeholder="Endereço" value={form.endereco} onChange={(e) => set("endereco", e.target.value)} className={errors.endereco ? inputErrorClass : inputClass} />
            <FieldError msg={errors.endereco} />

            <input type="text" placeholder="CEP" value={form.cep} onChange={(e) => set("cep", maskCEP(e.target.value))} className={errors.cep ? inputErrorClass : inputClass} />
            <FieldError msg={errors.cep} />

            <input type="text" placeholder="Telefone" value={form.telefone} onChange={(e) => set("telefone", maskTelefone(e.target.value))} className={errors.telefone ? inputErrorClass : inputClass} />
            <FieldError msg={errors.telefone} />

            <input type="email" placeholder="E-mail" value={form.email} onChange={(e) => set("email", e.target.value)} className={errors.email ? inputErrorClass : inputClass} />
            <FieldError msg={errors.email} />

            {error && (
              <p className="px-2 text-[13px] font-medium text-red-500">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-2 h-[50px] w-full rounded-full border border-[#9e9e9e]/24 bg-white text-[15px] font-semibold text-[#a3b5bf] transition-colors hover:border-[#0f62ac]/30 hover:text-[#0f62ac] disabled:opacity-50 sm:h-[55px] sm:text-[17px]"
            >
              {loading ? "Cadastrando..." : "Cadastrar empreendimento"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
