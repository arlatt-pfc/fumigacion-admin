import type { ReactNode } from "react";
import { AdminShell } from "@/src/components/dashboard/admin-shell";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
