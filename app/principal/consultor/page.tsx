"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Minha conta", href: "#conta" },
];

export default function PrincipalConsultor() {
  const router = useRouter();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f1f8fc]">
      <div className="pointer-events-none absolute -left-[100px] top-[40px] size-[268px] rounded-full bg-gradient-to-br from-[#0f62ac]/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-[50px] -top-[60px] size-[245px] rounded-full bg-gradient-to-bl from-[#0f62ac]/8 to-transparent blur-3xl" />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12 lg:px-[50px]">
        <div className="flex size-[42px] items-center justify-center rounded-md bg-[#0f62ac]">
          <Image
            src="/images/uff-logo.png"
            alt="Nutrion"
            width={36}
            height={18}
            className="h-[18px] w-[36px] object-contain brightness-0 invert"
          />
        </div>

        <nav className="hidden items-center gap-8 lg:flex xl:gap-[60px]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] font-semibold tracking-tight text-[#2e2e2e] transition-colors hover:text-[#0f62ac] lg:text-[17px]"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={handleLogout}
            className="text-[15px] font-semibold tracking-tight text-[#f25050] transition-colors hover:text-[#f25050]/80 lg:text-[17px]"
          >
            Sair
          </button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 bg-[#2e2e2e] transition-all duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#2e2e2e] transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#2e2e2e] transition-all duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </header>

      {/* Mobile Menu */}
      <div className={`absolute inset-x-0 top-[72px] z-30 border-b border-[#0f62ac]/10 bg-white/95 px-6 py-4 shadow-lg backdrop-blur-md transition-all duration-300 lg:hidden ${mobileMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`}>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-base font-semibold text-[#2e2e2e] transition-colors hover:text-[#0f62ac]" onClick={() => setMobileMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <button onClick={handleLogout} className="text-left text-base font-semibold text-[#f25050]">
            Sair
          </button>
        </nav>
      </div>

      {/* Hero */}
      <main className="relative z-10 px-6 pt-8 md:px-12 md:pt-12 lg:px-[50px] lg:pt-16">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-0">
          <div className="flex max-w-[785px] flex-1 flex-col text-center lg:text-left">
            <h1 className="font-[family-name:var(--font-heading)] text-[32px] font-extrabold leading-[1.1] tracking-tight sm:text-[44px] md:text-[52px] lg:text-[60px] lg:tracking-[-2.4px]">
              <span className="text-[#0f62ac]">Facilitando</span> a avaliação
              de serviços alimentares.
            </h1>

            <p className="mx-auto mt-6 max-w-[600px] text-[15px] font-medium leading-[1.5] tracking-tight text-[#2e2e2e]/80 sm:text-[16px] lg:mx-0 lg:text-[17px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Pellentesque habitant morbi tristique senectus et netus. Vulputate
              odio ut enim blandit. Quisque egestas diam in arcu cursus.
            </p>

            {/* CTA — Só Consultor */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                onClick={() => router.push("/projeto/consultor")}
                className="inline-flex h-[45px] w-full items-center justify-center rounded-full bg-[#0f62ac] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#0f62ac]/90 sm:w-auto sm:min-w-[250px] sm:text-[16px]"
              >
                Iniciar como Consultor
              </button>
              <a
                href="#conhecer"
                className="inline-flex h-[45px] w-full items-center justify-center rounded-full border-2 border-[#0f62ac] px-6 text-[15px] font-medium text-[#0f62ac] transition-colors hover:bg-[#0f62ac]/5 sm:w-auto sm:min-w-[150px] sm:text-[16px]"
              >
                Conhecer
              </a>
            </div>

            {/* Partner Logos */}
            <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
              <div className="flex items-center gap-3">
                <Image src="/images/uff-shield.png" alt="UFF" width={55} height={30} className="h-[30px] w-auto object-contain" />
                <Image src="/images/partner-logo.svg" alt="Universidade Federal Fluminense" width={55} height={30} className="h-[30px] w-auto object-contain" />
              </div>
              <div className="h-[40px] w-[2px] bg-[#0f62ac]/12" />
              <Image src="/images/ufrj-logo.png" alt="UFRJ" width={62} height={49} className="h-[42px] w-auto object-contain" />
            </div>
          </div>

          {/* Illustration */}
          <div className="relative mt-4 flex w-full max-w-[420px] items-center justify-center lg:mt-0 lg:w-[512px] lg:max-w-none lg:flex-none">
            <div className="relative aspect-square w-full overflow-hidden rounded-[200px] bg-gradient-to-br from-[#0f62ac]/5 via-[#0f62ac]/10 to-[#0f62ac]/5 lg:rounded-[260px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero-illustration.svg" alt="Ilustração" className="absolute inset-0 size-full object-contain p-8" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
