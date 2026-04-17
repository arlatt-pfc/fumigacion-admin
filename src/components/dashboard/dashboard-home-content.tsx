import { DashboardClient, type VisitRow } from "@/app/dashboard-client";
import { RefreshButton } from "@/app/refresh-button";
import { supabase } from "@/lib/supabase";
import { PageHeader } from "@/src/components/dashboard/page-header";

export const dynamic = "force-dynamic";

async function getVisits() {
  const { data, error } = await supabase
    .from("visits_dashboard")
    .select(
      "id, operator_id, client_name, station_name, consumption, notes, photo_url, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as VisitRow[];
}

function getUniqueValues(values: Array<string | null>) {
  return values
    .filter((value): value is string => Boolean(value?.trim()))
    .map((value) => value.trim())
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort((a, b) => a.localeCompare(b, "es"));
}

function DashboardHeroActions() {
  return (
    <div className="flex flex-col items-start gap-3 lg:items-end">
      <RefreshButton />
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Monitoreo activo
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          Entorno admin demo
        </span>
      </div>
    </div>
  );
}

export async function DashboardHomeContent() {
  const visits = await getVisits();
  const clientOptions = getUniqueValues(visits.map((visit) => visit.client_name));
  const operatorOptions = getUniqueValues(
    visits.map((visit) => visit.operator_id),
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        pathname="/dashboard"
        title="Inicio / Dashboard"
        description="Vista general con KPIs, actividad reciente, alertas y resumen operativo del sistema de Monitoreo, Mantenimiento y Control de Fumigación."
        badge="Activo"
      />

      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.32)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-700">
              Centro operativo
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Supervisión central de visitas y actividad reciente
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Esta vista reutiliza el dashboard existente para mantener continuidad
              operativa mientras la nueva arquitectura administrativa crece por módulos.
            </p>
          </div>
          <DashboardHeroActions />
        </div>
      </section>

      <DashboardClient
        visits={visits}
        clientOptions={clientOptions}
        operatorOptions={operatorOptions}
      />
    </div>
  );
}
