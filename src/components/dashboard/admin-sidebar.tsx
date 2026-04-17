"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/src/components/dashboard/icons";
import {
  getVisibleNavigation,
  isNavigationGroup,
  type NavigationItem,
  type UserRole,
} from "@/src/config/navigation";

function isPathActive(currentPath: string, href: string) {
  if (href === "/dashboard") {
    return currentPath === href;
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function isGroupActive(currentPath: string, item: NavigationItem) {
  return (
    isNavigationGroup(item) &&
    item.children.some((child) => isPathActive(currentPath, child.href))
  );
}

function SidebarContent({
  role,
  onNavigate,
  tone = "desktop",
}: {
  role: UserRole;
  onNavigate?: () => void;
  tone?: "desktop" | "mobile";
}) {
  const pathname = usePathname();
  const items = getVisibleNavigation(role);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const isDesktop = tone === "desktop";

  return (
    <div
      className={`flex h-full flex-col ${
        isDesktop ? "bg-white text-slate-900" : "bg-slate-950 text-white"
      }`}
    >
      <div
        className={`px-5 py-6 ${
          isDesktop ? "border-b border-slate-200" : "border-b border-white/10"
        }`}
      >
        <div
          className={`mb-4 rounded-2xl border px-3 py-2 text-xs font-bold uppercase tracking-[0.32em] ${
            isDesktop
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
          }`}
        >
          SIDEBAR OK
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
              isDesktop
                ? "bg-slate-950 text-white shadow-lg shadow-slate-300/40"
                : "bg-white/12 text-white shadow-lg shadow-slate-950/20 ring-1 ring-white/10"
            }`}
          >
            <Icon name="monitoring" className="h-5 w-5" />
          </div>
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.32em] ${
                isDesktop ? "text-sky-700" : "text-sky-300/80"
              }`}
            >
              Fumigación
            </p>
            <p
              className={`text-sm font-semibold ${
                isDesktop ? "text-slate-950" : "text-white"
              }`}
            >
              Monitoreo y Control
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
        {items.map((item) => {
          if (!isNavigationGroup(item)) {
            const active = isPathActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium ${
                  active
                    ? isDesktop
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-300/30"
                      : "bg-white text-slate-950 shadow-lg shadow-slate-950/10"
                    : isDesktop
                      ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon
                  name={item.icon}
                  className={`h-5 w-5 ${
                    active
                      ? isDesktop
                        ? "text-sky-300"
                        : "text-sky-700"
                      : isDesktop
                        ? "text-slate-400"
                        : "text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          }

          const active = isGroupActive(pathname, item);
          const expanded = openGroups[item.label] ?? active;

          return (
            <div
              key={item.label}
              className={`rounded-[1.75rem] border ${
                active
                  ? isDesktop
                    ? "border-slate-200 bg-slate-50"
                    : "border-white/14 bg-white/7"
                  : "border-transparent bg-transparent"
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenGroups((current) => ({
                    ...current,
                    [item.label]: !expanded,
                  }))
                }
                className={`flex w-full items-center gap-3 px-3 py-3 text-left text-sm font-medium ${
                  active
                    ? isDesktop
                      ? "text-slate-950"
                      : "text-white"
                    : isDesktop
                      ? "text-slate-700 hover:text-slate-950"
                      : "text-slate-300 hover:text-white"
                }`}
              >
                <Icon
                  name={item.icon}
                  className={`h-5 w-5 ${
                    active
                      ? isDesktop
                        ? "text-sky-700"
                        : "text-sky-300"
                      : "text-slate-400"
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                <Icon
                  name="chevron"
                  className={`h-4 w-4 transition-transform ${
                    expanded ? "rotate-90" : ""
                  }`}
                />
              </button>

              {expanded ? (
                <div className="space-y-1 px-3 pb-3">
                  {item.children.map((child) => {
                    const childActive = isPathActive(pathname, child.href);

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onNavigate}
                        className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm ${
                          childActive
                            ? isDesktop
                              ? "bg-slate-950 text-white shadow-lg shadow-slate-300/30"
                              : "bg-white text-slate-950 shadow-lg shadow-slate-950/10"
                            : isDesktop
                              ? "text-slate-600 hover:bg-white hover:text-slate-950"
                              : "text-slate-300 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        <Icon
                          name={child.icon}
                          className={`h-4 w-4 ${
                            childActive
                              ? isDesktop
                                ? "text-sky-300"
                                : "text-sky-700"
                              : "text-slate-500"
                          }`}
                        />
                        <span className="leading-5">{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div
        className={`p-4 ${
          isDesktop ? "border-t border-slate-200" : "border-t border-white/10"
        }`}
      >
        <div
          className={`rounded-[1.75rem] p-4 ${
            isDesktop
              ? "bg-slate-50 ring-1 ring-slate-200"
              : "bg-white/7 ring-1 ring-white/8"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                isDesktop
                  ? "bg-slate-950 text-white"
                  : "bg-sky-400/18 text-sky-200"
              }`}
            >
              RA
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm font-semibold ${
                  isDesktop ? "text-slate-950" : "text-white"
                }`}
              >
                Root Admin
              </p>
              <p
                className={`truncate text-xs ${
                  isDesktop ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Sesión demostrativa
              </p>
            </div>
            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${
                isDesktop
                  ? "text-slate-500 hover:bg-slate-200 hover:text-slate-950"
                  : "text-slate-300 hover:bg-white/8 hover:text-white"
              }`}
              aria-label="Cerrar sesión"
            >
              <Icon name="logout" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar({ role = "root-admin" }: { role?: UserRole }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 px-4 py-4 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700">
              Fumigación
            </p>
            <p className="text-base font-semibold text-slate-950">
              Monitoreo y Control
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm"
            aria-label="Abrir menú"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <aside className="hidden shrink-0 lg:flex lg:w-80 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
          <SidebarContent role={role} tone="desktop" />
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
          />
          <div className="relative h-full w-[88vw] max-w-[340px] border-r border-slate-200 bg-slate-950 shadow-2xl">
            <div className="flex justify-end px-4 pt-4">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white"
                aria-label="Cerrar menú"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent
              role={role}
              onNavigate={() => setMobileOpen(false)}
              tone="mobile"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
