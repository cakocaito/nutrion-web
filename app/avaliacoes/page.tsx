"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

const ConsultorAvaliacoes = dynamic(() => import("@/app/projeto/consultor/page"), { ssr: false });
const ResponsavelAvaliacoes = dynamic(() => import("@/app/projeto/responsavel/page"), { ssr: false });

export default function AvaliacoesPage() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  if (role === "responsavel") return <ResponsavelAvaliacoes />;
  return <ConsultorAvaliacoes />;
}
