"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

/* ───── Icons ───── */

export function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#0f62ac" : "#6b7280"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function BranchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 01-9 9" />
    </svg>
  );
}

export function WorkIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function BellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

export function HelpIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a3b5bf"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

export function LogoutIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f25050"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function FilterIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

export function MobileIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export function ChevronLeftIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

/* ───── Sidebar ───── */

export function Sidebar({
  role,
  collapsed,
  onToggle,
}: {
  role: "consultor" | "responsavel";
  collapsed: boolean;
  onToggle: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/");
  }

  const isHome = pathname === `/principal/${role}`;
  const isAvaliacoes = pathname.startsWith(`/projeto/${role}`);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-full flex-col border-r border-[#0f62ac]/10 bg-white transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[240px]"}`}
    >
      {/* Logo */}
      <div className="flex h-[64px] items-center gap-3 border-b border-[#0f62ac]/10 px-4">
        <div className="flex size-[36px] shrink-0 items-center justify-center rounded-md bg-[#0f62ac]">
          <span className="text-xs font-bold text-white">uff</span>
        </div>
        {!collapsed && (
          <span className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-[#2e2e2e]">
            NutriSec
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        <SidebarItem
          icon={<HomeIcon active={isHome} />}
          label="Início"
          active={isHome}
          collapsed={collapsed}
          onClick={() => router.push(`/principal/${role}`)}
        />
        <SidebarItem
          icon={<BranchIcon />}
          label="Avaliações"
          active={isAvaliacoes}
          collapsed={collapsed}
          onClick={() => router.push(`/projeto/${role}`)}
        />
        <SidebarItem
          icon={<SettingsIcon />}
          label="Perfil"
          active={pathname === "/perfil"}
          collapsed={collapsed}
          onClick={() => router.push("/perfil")}
        />
        <SidebarItem
          icon={<HelpIcon />}
          label="FAQ"
          active={pathname === "/faq"}
          collapsed={collapsed}
          onClick={() => router.push("/faq")}
        />
        <SidebarItem
          icon={<MobileIcon />}
          label="REDCap Mobile"
          active={pathname === "/redcap"}
          collapsed={collapsed}
          onClick={() => router.push("/redcap")}
        />
      </nav>

      {/* Bottom Items */}
      <div className="mb-4 flex flex-col gap-1 border-t border-[#0f62ac]/10 px-3 pt-4">
        <SidebarItem
          icon={<LogoutIcon />}
          label="Sair"
          collapsed={collapsed}
          danger
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  collapsed,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed: boolean;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${
        active
          ? "bg-[#0f62ac]/8 text-[#0f62ac]"
          : danger
            ? "text-[#f25050] hover:bg-[#f25050]/5"
            : "text-[#6b7280] hover:bg-gray-50"
      } ${collapsed ? "justify-center" : ""}`}
      title={collapsed ? label : undefined}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

/* ───── Mobile Sidebar ───── */

export function MobileSidebar({
  role,
  open,
  onClose,
}: {
  role: "consultor" | "responsavel";
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/");
  }

  const isHome = pathname === `/principal/${role}`;
  const isAvaliacoes = pathname.startsWith(`/projeto/${role}`);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
      />
      {/* Drawer */}
      <aside className="fixed left-0 top-0 z-50 flex h-full w-[260px] flex-col bg-white shadow-xl">
        <div className="flex h-[64px] items-center gap-3 border-b border-[#0f62ac]/10 px-4">
          <div className="flex size-[36px] shrink-0 items-center justify-center rounded-md bg-[#0f62ac]">
            <span className="text-xs font-bold text-white">uff</span>
          </div>
          <span className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-[#2e2e2e]">
            NutriSec
          </span>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
          <SidebarItem
            icon={<HomeIcon active={isHome} />}
            label="Início"
            active={isHome}
            collapsed={false}
            onClick={() => { router.push(`/principal/${role}`); onClose(); }}
          />
          <SidebarItem
            icon={<BranchIcon />}
            label="Avaliações"
            active={isAvaliacoes}
            collapsed={false}
            onClick={() => { router.push(`/projeto/${role}`); onClose(); }}
          />
          <SidebarItem
            icon={<SettingsIcon />}
            label="Perfil"
            active={pathname === "/perfil"}
            collapsed={false}
            onClick={() => { router.push("/perfil"); onClose(); }}
          />
          <SidebarItem
            icon={<HelpIcon />}
            label="FAQ"
            active={pathname === "/faq"}
            collapsed={false}
            onClick={() => { router.push("/faq"); onClose(); }}
          />
          <SidebarItem
            icon={<MobileIcon />}
            label="REDCap Mobile"
            active={pathname === "/redcap"}
            collapsed={false}
            onClick={() => { router.push("/redcap"); onClose(); }}
          />
        </nav>

        <div className="mb-4 flex flex-col gap-1 border-t border-[#0f62ac]/10 px-3 pt-4">
          <SidebarItem
            icon={<LogoutIcon />}
            label="Sair"
            collapsed={false}
            danger
            onClick={handleLogout}
          />
        </div>
      </aside>
    </>
  );
}

/* ───── Top Bar ───── */

const SUPORTE_WHATSAPP = process.env.NEXT_PUBLIC_SUPORTE_WHATSAPP ?? "";

function UserAvatar({ name }: { name?: string }) {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";
  return (
    <div className="flex size-[34px] items-center justify-center rounded-full bg-[#0f62ac] text-[13px] font-bold text-white">
      {initials}
    </div>
  );
}

interface AvaliacaoNotif {
  id: number;
  estabelecimentoNome: string;
  status: string;
  dataRealizacao: string | null;
  dataAgendada: string;
}

interface NotifItem {
  id: number;
  titulo: string;
  descricao: string;
  dataRelatorio?: string;
  temRelatorio: boolean;
}

function notifStateKey(email: string) {
  return `nutrisec_notif_state_${email}`;
}

function buildNotifs(
  current: AvaliacaoNotif[],
  prevState: Record<number, string>,
  isResponsavel: boolean
): NotifItem[] {
  const items: NotifItem[] = [];

  for (const a of current) {
    const prevStatus = prevState[a.id];
    const isNew = prevStatus === undefined;
    const changed = !isNew && prevStatus !== a.status;

    if (!isNew && !changed) continue;

    if (a.status === "Concluida") {
      items.push({
        id: a.id,
        titulo: "Avaliação concluída",
        descricao: `${a.estabelecimentoNome} — relatório disponível`,
        dataRelatorio: a.dataRealizacao ?? a.dataAgendada,
        temRelatorio: true,
      });
    } else if (a.status === "EmAndamento" && isResponsavel) {
      items.push({
        id: a.id,
        titulo: "Avaliação iniciada",
        descricao: `${a.estabelecimentoNome}`,
        dataRelatorio: a.dataAgendada,
        temRelatorio: false,
      });
    } else if (a.status === "Agendada" && isResponsavel && isNew) {
      items.push({
        id: a.id,
        titulo: "Nova avaliação agendada",
        descricao: `${a.estabelecimentoNome}`,
        dataRelatorio: a.dataAgendada,
        temRelatorio: false,
      });
    }
  }

  return items;
}

export function TopBar({
  role,
  onMenuToggle,
}: {
  role: "consultor" | "responsavel";
  onMenuToggle: () => void;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notifs, setNotifs] = useState<NotifItem[]>([]);
  const [currentState, setCurrentState] = useState<Record<number, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user?.email) return;
    const isResponsavel = user.role?.toLowerCase() === "responsavel";
    const savedState: Record<number, string> = JSON.parse(
      localStorage.getItem(notifStateKey(user.email)) ?? "{}"
    );

    apiFetch("/api/avaliacoes")
      .then((data: AvaliacaoNotif[]) => {
        const newState: Record<number, string> = {};
        data.forEach((a) => { newState[a.id] = a.status; });
        setCurrentState(newState);
        setNotifs(buildNotifs(data, savedState, isResponsavel));
      })
      .catch(() => {});
  }, [user?.email]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
      if (bellRef.current && !bellRef.current.contains(e.target as Node))
        setBellOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    setDropdownOpen(false);
    logout();
    router.push("/");
  }

  function handleBellOpen() {
    setBellOpen((v) => !v);
    if (!bellOpen && user?.email) {
      localStorage.setItem(notifStateKey(user.email), JSON.stringify(currentState));
      setNotifs([]);
    }
  }

  return (
    <header className="flex h-[64px] items-center justify-between border-b border-[#0f62ac]/10 bg-white px-4 sm:px-6">
      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuToggle}
        className="mr-3 flex flex-col gap-1 lg:hidden"
        aria-label="Menu"
      >
        <span className="block h-0.5 w-5 bg-[#2e2e2e]" />
        <span className="block h-0.5 w-5 bg-[#2e2e2e]" />
        <span className="block h-0.5 w-5 bg-[#2e2e2e]" />
      </button>

      {/* Search */}
      <div className="relative max-w-[400px] flex-1">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Buscar projetos..."
          className="h-[40px] w-full rounded-full border border-[#9e9e9e]/20 bg-[#f8fafb] pl-10 pr-4 text-[14px] font-medium text-[#2e2e2e] placeholder-[#a3b5bf] outline-none transition-colors focus:border-[#0f62ac]/30"
        />
      </div>

      {/* Right actions */}
      <div className="ml-4 flex items-center gap-2">

        {/* Bell */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={handleBellOpen}
            className="relative flex size-[36px] items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <BellIcon />
            {notifs.length > 0 && (
              <span className="absolute right-1 top-1 flex size-[16px] items-center justify-center rounded-full bg-[#f25050] text-[9px] font-bold text-white">
                {notifs.length > 9 ? "9+" : notifs.length}
              </span>
            )}
          </button>

          {bellOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[280px] overflow-hidden rounded-2xl border border-[#e5eaf0] bg-white shadow-lg">
              <div className="border-b border-[#e5eaf0] px-4 py-3">
                <p className="text-[13px] font-semibold text-[#2e2e2e]">Notificações</p>
              </div>
              <div className="max-h-[280px] overflow-y-auto">
                {notifs.length === 0 ? (
                  <p className="px-4 py-6 text-center text-[13px] text-[#9ca3af]">Nenhuma novidade por aqui.</p>
                ) : (
                  notifs.map((n) => (
                    <button
                      key={`${n.id}-${n.titulo}`}
                      onClick={() => {
                        setBellOpen(false);
                        router.push(n.temRelatorio ? `/relatorio/${n.id}` : `/projeto/${role}`);
                      }}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[#f8fafb]"
                    >
                      <span className={`mt-1 size-2 shrink-0 rounded-full ${n.temRelatorio ? "bg-emerald-500" : "bg-[#0f62ac]"}`} />
                      <div>
                        <p className="text-[13px] font-semibold text-[#2e2e2e]">{n.titulo}</p>
                        <p className="text-[12px] text-[#6b7280]">{n.descricao}</p>
                        {n.dataRelatorio && (
                          <p className="mt-0.5 text-[11px] text-[#9ca3af]">
                            {new Date(n.dataRelatorio).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Avatar + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="ml-1 flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-gray-100"
          >
            <UserAvatar name={user?.nomeCompleto} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[220px] overflow-hidden rounded-2xl border border-[#e5eaf0] bg-white shadow-lg">
              {/* Cabeçalho do usuário */}
              <div className="border-b border-[#e5eaf0] px-4 py-3">
                <p className="truncate text-[14px] font-semibold text-[#2e2e2e]">
                  {user?.nomeCompleto ?? "Usuário"}
                </p>
                <p className="truncate text-[12px] text-[#9ca3af]">{user?.email ?? ""}</p>
                <span className="mt-1.5 inline-block rounded-full bg-[#0f62ac]/10 px-2 py-0.5 text-[11px] font-semibold text-[#0f62ac]">
                  {user?.role ?? ""}
                </span>
              </div>

              {/* Ações */}
              <div className="p-1.5">
                <button
                  onClick={() => { setDropdownOpen(false); router.push("/perfil"); }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-[#2e2e2e] transition-colors hover:bg-[#f8fafb]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Meu perfil
                </button>

                {SUPORTE_WHATSAPP && (
                  <a
                    href={`https://wa.me/${SUPORTE_WHATSAPP}?text=Olá,%20preciso%20de%20suporte%20no%20NutriSec`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-[#2e2e2e] transition-colors hover:bg-[#f8fafb]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    Falar com suporte
                  </a>
                )}

                <div className="my-1 border-t border-[#e5eaf0]" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-[#f25050] transition-colors hover:bg-red-50"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f25050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ───── Project Card ───── */

export function ProjectCard({
  id,
  title,
  institution,
  status,
  date,
  temRelatorio,
  onCancelado,
}: {
  id?: number;
  title: string;
  institution: string;
  status: "em_andamento" | "concluido" | "pendente";
  date: string;
  members: number;
  temRelatorio?: boolean;
  onCancelado?: () => void;
}) {
  const router = useRouter();
  const [confirmando, setConfirmando] = useState(false);
  const [cancelando, setCancelando] = useState(false);

  const statusMap = {
    em_andamento: { label: "Em andamento", color: "bg-[#0f62ac]/10 text-[#0f62ac]" },
    concluido: { label: "Concluído", color: "bg-emerald-50 text-emerald-600" },
    pendente: { label: "Pendente", color: "bg-amber-50 text-amber-600" },
  };

  const s = statusMap[status];

  async function handleCancelar() {
    if (!id) return;
    setCancelando(true);
    try {
      await apiFetch(`/api/avaliacoes/${id}`, { method: "DELETE" });
      onCancelado?.();
    } finally {
      setCancelando(false);
      setConfirmando(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[#0f62ac]/15 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-[#2e2e2e]">
            {title}
          </h3>
          <p className="mt-1 text-[13px] font-medium text-[#6b7280]">
            {institution}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${s.color}`}>
            {s.label}
          </span>
          {status === "pendente" && id && !confirmando && (
            <button
              onClick={() => setConfirmando(true)}
              title="Cancelar avaliação"
              className="flex size-[28px] items-center justify-center rounded-full text-[#9ca3af] transition-colors hover:bg-red-50 hover:text-red-500"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Confirmação de cancelamento */}
      {confirmando && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5">
          <p className="flex-1 text-[12px] text-red-600">Cancelar esta avaliação?</p>
          <button
            onClick={handleCancelar}
            disabled={cancelando}
            className="rounded-lg bg-red-500 px-3 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50"
          >
            {cancelando ? "..." : "Sim"}
          </button>
          <button
            onClick={() => setConfirmando(false)}
            className="rounded-lg px-3 py-1 text-[11px] font-semibold text-[#6b7280] transition-colors hover:bg-red-100"
          >
            Não
          </button>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-[12px] text-[#6b7280]">
        <span>{date}</span>
        {status === "pendente" && id && (
          <span className="rounded-md bg-[#f1f8fc] px-2 py-0.5 font-mono font-semibold text-[#0f62ac]">
            id_pesquisa: {id}
          </span>
        )}
        {temRelatorio && id && (
          <button
            onClick={() => router.push(`/relatorio/${id}`)}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 transition-colors hover:bg-emerald-100"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Ver relatório
          </button>
        )}
      </div>
    </div>
  );
}
