import type { ReactNode } from "react";
import { AdminSidebar } from "@/src/components/dashboard/admin-sidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div
      data-dashboard-shell
      className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.15),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#edf3f8_100%)] text-slate-950"
    >
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <AdminSidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
