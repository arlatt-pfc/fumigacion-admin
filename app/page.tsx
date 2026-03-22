import { DashboardClient, type VisitRow } from "./dashboard-client";
import { RefreshButton } from "./refresh-button";
import { supabase } from "@/lib/supabase";

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

export default async function Home() {
  const visits = await getVisits();
  const clientOptions = getUniqueValues(visits.map((visit) => visit.client_name));
  const operatorOptions = getUniqueValues(
    visits.map((visit) => visit.operator_id),
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(208,228,255,0.45),_transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-700">
                Fumigacion System
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Dashboard operativo de visitas
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Supervisa las visitas capturadas desde Supabase en una sola
                vista, con foco en volumen, evidencia fotográfica y contexto de
                ejecución.
              </p>
            </div>
            <RefreshButton />
          </div>
        </section>

        <DashboardClient
          visits={visits}
          clientOptions={clientOptions}
          operatorOptions={operatorOptions}
        />
      </div>
    </main>
  );
}
