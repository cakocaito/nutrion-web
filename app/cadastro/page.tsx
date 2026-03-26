"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cadastro() {
  const router = useRouter();
  const [selected, setSelected] = useState<"consultor" | "responsavel" | null>(
    null
  );

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f1f8fc] px-4 py-8">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute -left-[82px] bottom-0 size-[268px] rounded-full bg-gradient-to-tr from-[#0f62ac]/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-[40px] top-[60px] size-[160px] rounded-full bg-gradient-to-bl from-[#0f62ac]/8 to-transparent blur-3xl" />

      {/* Decorative dashed curves */}
      <svg
        className="pointer-events-none absolute bottom-[60px] right-[40px] hidden h-[400px] w-[200px] lg:block"
        viewBox="0 0 200 400"
        fill="none"
      >
        <path
          d="M20 0 C 20 150, 180 150, 180 300 C 180 350, 140 400, 80 400"
          stroke="#0f62ac"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          opacity="0.2"
        />
        <path
          d="M40 20 C 40 160, 190 170, 170 320"
          stroke="#0f62ac"
          strokeWidth="1"
          strokeDasharray="6 5"
          opacity="0.15"
        />
      </svg>

      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="absolute left-6 top-6 z-20 flex size-10 items-center justify-center rounded-full text-[#2e2e2e] transition-colors hover:bg-white/50 sm:left-10 sm:top-10 md:left-[120px] md:top-[140px]"
        aria-label="Voltar"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
            <Image
              src="/images/uff-logo.png"
              alt="Navio Escola"
              width={44}
              height={22}
              className="h-[20px] w-[40px] object-contain brightness-0 invert sm:h-[27px] sm:w-[54px]"
            />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">
              Navio Escola
            </h1>
            <p className="text-[14px] font-medium text-black/60 sm:text-[16px]">
              Crie uma conta ou faça login
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 sm:mt-10">
          <h2 className="font-[family-name:var(--font-heading)] text-[20px] font-bold tracking-tight text-black sm:text-[24px]">
            Criar conta
          </h2>
          <p className="mt-1 text-[14px] font-medium text-black/60 sm:text-[16px]">
            Primeiro, escolha seu tipo de conta:
          </p>

          {/* Type Selection */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-8">
            <button
              onClick={() => setSelected("consultor")}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-6 text-center transition-all sm:gap-3 sm:px-6 sm:py-8 ${
                selected === "consultor"
                  ? "border-[#0f62ac] bg-[#0f62ac]/5"
                  : "border-[#9e9e9e]/20 bg-white/60 hover:border-[#0f62ac]/30"
              }`}
            >
              <span
                className={`font-[family-name:var(--font-heading)] text-[16px] font-bold sm:text-[18px] ${
                  selected === "consultor"
                    ? "text-[#0f62ac]"
                    : "text-[#a3b5bf]"
                }`}
              >
                Consultor
              </span>
              <span className="text-[12px] font-medium leading-snug text-[#2e2e2e]/70 sm:text-[14px]">
                Responsável pela avaliação da unidade de refeição.
              </span>
            </button>

            <button
              onClick={() => setSelected("responsavel")}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-6 text-center transition-all sm:gap-3 sm:px-6 sm:py-8 ${
                selected === "responsavel"
                  ? "border-[#0f62ac] bg-[#0f62ac]/5"
                  : "border-[#9e9e9e]/20 bg-white/60 hover:border-[#0f62ac]/30"
              }`}
            >
              <span
                className={`font-[family-name:var(--font-heading)] text-[16px] font-bold sm:text-[18px] ${
                  selected === "responsavel"
                    ? "text-[#0f62ac]"
                    : "text-[#a3b5bf]"
                }`}
              >
                Responsável
              </span>
              <span className="text-[12px] font-medium leading-snug text-[#2e2e2e]/70 sm:text-[14px]">
                Responsável pela unidade de refeição avaliada.
              </span>
            </button>
          </div>

          {/* Continue */}
          <button
            onClick={() => {
              if (selected) router.push(`/cadastro/${selected}`);
            }}
            disabled={!selected}
            className={`mt-6 h-[50px] w-full rounded-full border text-[15px] font-semibold transition-colors sm:mt-8 sm:h-[55px] sm:text-[17px] ${
              selected
                ? "border-[#0f62ac]/30 bg-white text-[#0f62ac] hover:bg-[#0f62ac]/5"
                : "border-[#9e9e9e]/24 bg-white text-[#a3b5bf]"
            }`}
          >
            Continuar
          </button>
        </div>
      </div>

      {/* Footer Terms */}
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
