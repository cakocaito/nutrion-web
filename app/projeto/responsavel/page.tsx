"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUser } from "@/lib/auth";
import EmpresaSelecao from "./EmpresaSelecao";
import EntrarEmpresa from "./EntrarEmpresa";
import CadastrarEmpresa from "./CadastrarEmpresa";
import PainelEmpreendimentos from "./PainelEmpreendimentos";
import CadastrarEmpreendimento from "./CadastrarEmpreendimento";

type Tela =
  | "loading"
  | "selecao"
  | "entrar"
  | "cadastrar-empresa"
  | "painel"
  | "novo-empreendimento";

export default function ProjetoResponsavel() {
  const { user, setUser } = useAuth();
  const [tela, setTela] = useState<Tela>("loading");
  const [empresaId, setEmpresaId] = useState<number | null>(null);

  useEffect(() => {
    const stored = getUser();
    if (stored) {
      if (!user) setUser(stored);
      if (stored.empresaId) {
        setEmpresaId(stored.empresaId);
        setTela("painel");
      } else {
        setTela("selecao");
      }
    } else {
      setTela("selecao");
    }
  }, []);

  function handleEmpresaVinculada(id: number) {
    setEmpresaId(id);
    // Update user in context
    const stored = getUser();
    if (stored) {
      stored.empresaId = id;
      localStorage.setItem("user", JSON.stringify(stored));
      setUser(stored);
    }
    setTela("painel");
  }

  if (tela === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f1f8fc]">
        <div className="size-8 animate-spin rounded-full border-4 border-[#0f62ac] border-t-transparent" />
      </div>
    );
  }

  if (tela === "selecao") {
    return (
      <EmpresaSelecao
        onEntrar={() => setTela("entrar")}
        onCadastrar={() => setTela("cadastrar-empresa")}
      />
    );
  }

  if (tela === "entrar") {
    return (
      <EntrarEmpresa
        onVoltar={() => setTela("selecao")}
        onSucesso={handleEmpresaVinculada}
      />
    );
  }

  if (tela === "cadastrar-empresa") {
    return (
      <CadastrarEmpresa
        onVoltar={() => setTela("selecao")}
        onSucesso={handleEmpresaVinculada}
      />
    );
  }

  if (tela === "novo-empreendimento" && empresaId) {
    return (
      <CadastrarEmpreendimento
        empresaId={empresaId}
        onVoltar={() => setTela("painel")}
        onSucesso={() => setTela("painel")}
      />
    );
  }

  return (
    <PainelEmpreendimentos
      empresaId={empresaId!}
      onNovoEmpreendimento={() => setTela("novo-empreendimento")}
    />
  );
}
