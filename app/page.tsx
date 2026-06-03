"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();
  const startHref = user ? "/home" : "/login";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f1f8fc]">
      {/* ── Background decorative ellipses ── */}
      <div className="pointer-events-none absolute -left-[103px] top-[38px] size-[268px]">
        <Image
          src="/images/bg-ellipse-3.svg"
          alt=""
          width={268}
          height={268}
          className="size-full"
        />
      </div>
      <div className="pointer-events-none absolute -right-[30px] -top-[59px] size-[245px] hidden lg:block">
        <Image
          src="/images/bg-ellipse-2.svg"
          alt=""
          width={245}
          height={245}
          className="size-full"
        />
      </div>
      <div className="pointer-events-none absolute bottom-[40px] right-[calc(50%-150px)] size-[245px] hidden lg:block">
        <Image
          src="/images/bg-ellipse-2.svg"
          alt=""
          width={245}
          height={245}
          className="size-full"
        />
      </div>

      {/* ── UFF icon top-left ── */}
      <a
        href="https://www.uff.br"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-[30px] top-[30px] z-20 flex size-[50px] items-center justify-center rounded-md bg-[#0f62ac] transition-opacity hover:opacity-90 sm:left-[50px] sm:top-[40px]"
      >
        <Image
          src="/images/uff-logo.png"
          alt="UFF"
          width={45}
          height={22}
          className="h-[22px] w-[45px] object-contain brightness-0 invert"
        />
      </a>

      {/* ── Sobre link top-right ── */}
      <Link
        href="/sobre"
        className="absolute right-[30px] top-[45px] z-20 text-[14px] font-semibold text-[#0f62ac] transition-opacity hover:opacity-70 sm:right-[50px] sm:top-[55px]"
      >
        Sobre
      </Link>

      {/* ── Hero illustration (right side, desktop) ── */}
      <div className="pointer-events-none absolute right-[0px] top-[50%] hidden -translate-y-[55%] lg:block xl:right-[40px]">
        <div className="relative h-[520px] w-[520px]">
          <Image
            src="/images/bg-ellipse-1.svg"
            alt=""
            width={610}
            height={610}
            className="absolute -right-[50px] -top-[40px] size-[610px]"
          />
          <Image
            src="/images/hero-illustration.svg"
            alt="Ilustração de avaliação"
            width={460}
            height={460}
            className="absolute left-[20px] top-[30px] z-10 size-[460px] rounded-[313px] object-contain"
          />
        </div>
      </div>

      {/* ── Main content (left side) ── */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-20 sm:px-[50px] lg:max-w-[55%]">
        {/* Title */}
        <h1 className="font-[family-name:var(--font-heading)] text-[36px] font-bold leading-[1.05] tracking-[-1.5px] text-[#2e2e2e] sm:text-[48px] sm:tracking-[-2px] lg:text-[60px] lg:tracking-[-2.4px]">
          <span className="text-[#0f62ac]">Automatizando</span> a avaliação
          de segurança dos alimentos.
        </h1>

        {/* Description paragraph */}
        <p className="mt-8 max-w-[785px] text-[15px] font-medium leading-[1.4] tracking-[-0.34px] text-[#2e2e2e]/80 sm:text-[17px]">
          As Doenças de Transmissão Hídrica e Alimentar representam um dos
          maiores desafios de saúde pública no mundo. O NutriSec é um sistema
          digital desenvolvido na Universidade Federal Fluminense que automatiza
          a avaliação de boas práticas em serviços de alimentação. Com seu
          motor de pontuação por risco sanitário, classifica automaticamente
          os estabelecimentos nas categorias A, B, C ou Pendente — transformando
          checklists em relatórios de conformidade imediatos e rastreáveis.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex items-center gap-5 sm:mt-10">
          <Link
            href={startHref}
            className="inline-flex h-[45px] items-center justify-center rounded-full bg-[#0f62ac] px-10 text-[16px] font-medium text-white transition-colors hover:bg-[#0f62ac]/90"
          >
            Começar
          </Link>
          <a
            href="https://redcap.uff.br/redcap/surveys/?s=TPJ4PMEMDL7AA98X"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[45px] items-center justify-center rounded-full border-2 border-[#0f62ac] px-7 text-[16px] font-medium text-[#0f62ac] transition-colors hover:bg-[#0f62ac]/5"
          >
            Responder Pesquisa
          </a>
        </div>

        {/* Partner logos */}
        <div className="mt-14 flex items-center gap-0">
          <Image
            src="/images/uff-shield.png"
            alt="UFF"
            width={55}
            height={30}
            className="h-[30px] w-auto object-contain"
          />
          <span className="ml-0.5 text-[11px] font-semibold leading-tight tracking-tight text-[#0f62ac]">
            Universidade<br />Federal<br />Fluminense
          </span>
          <div className="mx-4 h-[50px] w-[2px] bg-[#0f62ac]/12" />
          <Image
            src="/images/ufrj-logo.png"
            alt="UFRJ"
            width={62}
            height={49}
            className="h-[49px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
