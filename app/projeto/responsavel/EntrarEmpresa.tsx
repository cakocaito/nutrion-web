"use client";

import Image from "next/image";
import { useState } from "react";
import { buscarEmpresaPorCnpj, vincularEmpresaAoUsuario } from "@/lib/empresas";
import { maskCNPJ, validateCNPJ } from "@/lib/validators";

const inputClass =
  "h-[50px] w-full rounded-full border border-[#9e9e9e]/24 bg-white px-6 text-[15px] font-medium text-[#2e2e2e] placeholder-[#a3b5bf] outline-none transition-colors focus:border-[#0f62ac]/40 sm:h-[55px] sm:text-[17px]";

const inputErrorClass =
  "h-[50px] w-full rounded-full border border-red-400 bg-white px-6 text-[15px] font-medium text-[#2e2e2e] placeholder-[#a3b5bf] outline-none transition-colors focus:border-red-500 sm:h-[55px] sm:text-[17px]";

export default function EntrarEmpresa({
  onVoltar,
  onSucesso,
}: {
  onVoltar: () => void;
  onSucesso: (empresaId: number) => void;
}) {
  const [cnpj, setCnpj] = useState("");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [loading, setLoading] = useState(false);
  const [empresaEncontrada, setEmpresaEncontrada] = useState<{
    id: number;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
  } | null>(null);

  async function handleBuscar() {
    setError("");
    setFieldError("");
    setEmpresaEncontrada(null);

    const cnpjErr = validateCNPJ(cnpj);
    if (cnpjErr) {
      setFieldError(cnpjErr);
      return;
    }

    setLoading(true);
    try {
      const empresa = await buscarEmpresaPorCnpj(cnpj.replace(/\D/g, ""));
      setEmpresaEncontrada(empresa);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Empresa não encontrada."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleVincular() {
    if (!empresaEncontrada) return;
    setError("");
    setLoading(true);
    try {
      await vincularEmpresaAoUsuario(empresaEncontrada.id);
      onSucesso(empresaEncontrada.id);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erro ao vincular empresa."
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
            <p className="text-[14px] font-medium text-black/60 sm:text-[16px]">Entrar em uma empresa</p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 sm:mt-10">
          <h2 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">Buscar empresa</h2>
          <p className="mt-1 text-[14px] font-medium text-black/60 sm:text-[16px]">Digite o CNPJ da empresa para encontrá-la.</p>

          <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5">
            <input
              type="text"
              placeholder="CNPJ da empresa"
              value={cnpj}
              onChange={(e) => {
                setCnpj(maskCNPJ(e.target.value));
                setFieldError("");
              }}
              className={fieldError ? inputErrorClass : inputClass}
            />
            {fieldError && (
              <p className="-mt-2 px-6 text-[12px] font-medium text-red-500">{fieldError}</p>
            )}

            {/* Empresa encontrada */}
            {empresaEncontrada && (
              <div className="rounded-2xl border-2 border-[#0f62ac] bg-[#0f62ac]/5 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#0f62ac]/10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f62ac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18" />
                      <path d="M5 21V7l8-4v18" />
                      <path d="M19 21V11l-6-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-[#2e2e2e]">{empresaEncontrada.nomeFantasia}</p>
                    <p className="text-[13px] font-medium text-[#6b7280]">{empresaEncontrada.razaoSocial}</p>
                    <p className="text-[12px] font-medium text-[#6b7280]">CNPJ: {empresaEncontrada.cnpj}</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <p className="px-2 text-[13px] font-medium text-red-500">{error}</p>
            )}

            {!empresaEncontrada ? (
              <button
                onClick={handleBuscar}
                disabled={loading}
                className="mt-2 h-[50px] w-full rounded-full border border-[#9e9e9e]/24 bg-white text-[15px] font-semibold text-[#a3b5bf] transition-colors hover:border-[#0f62ac]/30 hover:text-[#0f62ac] disabled:opacity-50 sm:h-[55px] sm:text-[17px]"
              >
                {loading ? "Buscando..." : "Buscar empresa"}
              </button>
            ) : (
              <button
                onClick={handleVincular}
                disabled={loading}
                className="mt-2 h-[50px] w-full rounded-full border border-[#0f62ac]/30 bg-white text-[15px] font-semibold text-[#0f62ac] transition-colors hover:bg-[#0f62ac]/5 disabled:opacity-50 sm:h-[55px] sm:text-[17px]"
              >
                {loading ? "Vinculando..." : "Entrar nesta empresa"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
