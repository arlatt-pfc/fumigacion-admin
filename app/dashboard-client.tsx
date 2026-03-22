"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export type VisitRow = {
  id: string;
  operator_id: string | null;
  client_name: string | null;
  station_name: string | null;
  consumption: number | string | null;
  notes: string | null;
  photo_url: string | null;
  created_at: string;
};

type DashboardClientProps = {
  visits: VisitRow[];
  clientOptions: string[];
  operatorOptions: string[];
};

type PhotoModalState = {
  url: string;
  clientName: string;
  stationName: string;
};

type VisitStatus = "synced" | "pending" | "error";
type VisitDetailState = VisitRow | null;

const tableDateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const tableTimeFormatter = new Intl.DateTimeFormat("es-MX", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatConsumption(value: VisitRow["consumption"]) {
  if (value === null || value === undefined || value === "") {
    return "Sin dato";
  }

  if (typeof value === "number") {
    return new Intl.NumberFormat("es-MX", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return String(value);
}

function formatDateParts(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return {
      date: "Fecha inválida",
      time: "--:--",
    };
  }

  return {
    date: tableDateFormatter.format(date),
    time: tableTimeFormatter.format(date),
  };
}

function matchesDateRange(visitDate: string, dateFrom: string, dateTo: string) {
  const date = new Date(visitDate);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  if (dateFrom) {
    const from = new Date(`${dateFrom}T00:00:00`);

    if (date < from) {
      return false;
    }
  }

  if (dateTo) {
    const to = new Date(`${dateTo}T23:59:59.999`);

    if (date > to) {
      return false;
    }
  }

  return true;
}

function KpiCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "slate" | "emerald" | "amber";
}) {
  const toneClasses = {
    slate: "bg-slate-950 text-white",
    emerald: "bg-emerald-500/15 text-emerald-900 ring-1 ring-emerald-600/20",
    amber: "bg-amber-500/15 text-amber-900 ring-1 ring-amber-600/20",
  };

  return (
    <article className={`rounded-3xl p-6 shadow-sm ${toneClasses[tone]}`}>
      <p className="text-sm font-medium uppercase tracking-[0.2em] opacity-70">
        {label}
      </p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{value}</p>
    </article>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function getVisitStatus(): VisitStatus {
  return "synced";
}

function getStatusLabel(status: VisitStatus) {
  const labels: Record<VisitStatus, string> = {
    synced: "Sincronizada",
    pending: "Pendiente",
    error: "Error",
  };

  return labels[status];
}

function StatusBadge({ status }: { status: VisitStatus }) {
  const statusConfig: Record<
    VisitStatus,
    { label: string; className: string; dotClassName: string }
  > = {
    synced: {
      label: getStatusLabel("synced"),
      className:
        "border border-emerald-200 bg-emerald-50 text-emerald-700",
      dotClassName: "bg-emerald-500",
    },
    pending: {
      label: getStatusLabel("pending"),
      className: "border border-amber-200 bg-amber-50 text-amber-700",
      dotClassName: "bg-amber-500",
    },
    error: {
      label: getStatusLabel("error"),
      className: "border border-rose-200 bg-rose-50 text-rose-700",
      dotClassName: "bg-rose-500",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      <span className={`h-2 w-2 rounded-full ${config.dotClassName}`} />
      {config.label}
    </span>
  );
}

function PhotoModal({
  photo,
  onClose,
}: {
  photo: PhotoModalState | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!photo) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Vista ampliada de foto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 text-lg font-semibold text-white transition hover:bg-slate-950"
          aria-label="Cerrar foto"
        >
          ×
        </button>

        <div className="grid max-h-[90vh] min-h-[320px] lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex items-center justify-center bg-slate-100 p-4 sm:p-6">
            {/* Remote URLs are dynamic from Supabase storage, so a native img keeps the modal generic without image domain config. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={`Foto de visita para ${photo.clientName}`}
              className="max-h-[72vh] w-full rounded-2xl object-contain"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-slate-200 bg-white p-6 lg:border-t-0 lg:border-l">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">
                Evidencia fotográfica
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                {photo.clientName}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {photo.stationName}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisitDetailModal({
  visit,
  onClose,
  onOpenPhoto,
}: {
  visit: VisitDetailState;
  onClose: () => void;
  onOpenPhoto: (visit: VisitRow) => void;
}) {
  useEffect(() => {
    if (!visit) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visit, onClose]);

  if (!visit) {
    return null;
  }

  const formattedDate = formatDateParts(visit.created_at);
  const status = getVisitStatus();

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Detalle de visita"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 text-lg font-semibold text-white transition hover:bg-slate-950"
          aria-label="Cerrar detalle"
        >
          ×
        </button>

        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.9fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">
              Detalle de visita
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {visit.client_name || "Sin cliente"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {visit.station_name || "Sin estación"}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <DetailField label="Fecha" value={formattedDate.date} />
              <DetailField label="Hora" value={formattedDate.time} />
              <DetailField
                label="Operador"
                value={visit.operator_id || "Sin operador"}
              />
              <DetailField
                label="Consumo"
                value={formatConsumption(visit.consumption)}
              />
              <DetailField
                label="Estado"
                valueNode={<StatusBadge status={status} />}
              />
              <DetailField
                label="Estación"
                value={visit.station_name || "Sin estación"}
              />
            </div>

            <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Notas
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {visit.notes?.trim() || "Sin notas"}
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Evidencia
            </p>
            {visit.photo_url ? (
              <>
                <div className="mt-4 flex min-h-[260px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={visit.photo_url}
                    alt={`Foto de visita para ${visit.client_name || "cliente"}`}
                    className="max-h-[320px] w-full rounded-2xl object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onOpenPhoto(visit)}
                  className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Ver foto grande
                </button>
              </>
            ) : (
              <div className="mt-4 flex min-h-[260px] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-white text-sm text-slate-400">
                Sin foto disponible
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailField({
  label,
  value,
  valueNode,
}: {
  label: string;
  value?: string;
  valueNode?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <div className="mt-3 text-sm font-medium text-slate-800">
        {valueNode ?? value}
      </div>
    </div>
  );
}

const filterInputClassName =
  "h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-sky-50/40";

function escapeCsvValue(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export function DashboardClient({
  visits,
  clientOptions,
  operatorOptions,
}: DashboardClientProps) {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoModalState | null>(
    null,
  );
  const [selectedVisit, setSelectedVisit] = useState<VisitDetailState>(null);

  const filteredVisits = visits.filter((visit) => {
    const matchesClient =
      !selectedClient || (visit.client_name ?? "").trim() === selectedClient;
    const matchesOperator =
      !selectedOperator ||
      (visit.operator_id ?? "").trim() === selectedOperator;
    const matchesDate = matchesDateRange(visit.created_at, dateFrom, dateTo);

    return matchesClient && matchesOperator && matchesDate;
  });

  const withPhoto = filteredVisits.filter((visit) => Boolean(visit.photo_url)).length;
  const withoutPhoto = filteredVisits.length - withPhoto;
  const hasActiveFilters = Boolean(
    selectedClient || selectedOperator || dateFrom || dateTo,
  );

  const handleClearFilters = () => {
    setSelectedClient("");
    setSelectedOperator("");
    setDateFrom("");
    setDateTo("");
  };

  const handleOpenPhoto = (visit: VisitRow) => {
    if (!visit.photo_url) {
      return;
    }

    setSelectedPhoto({
      url: visit.photo_url,
      clientName: visit.client_name || "Sin cliente",
      stationName: visit.station_name || "Sin estación",
    });
  };

  const handleExportCsv = () => {
    const headers = [
      "Fecha",
      "Hora",
      "Operador",
      "Cliente",
      "Estación",
      "Consumo",
      "Notas",
      "Estado",
      "Foto",
    ];

    const rows = filteredVisits.map((visit) => {
      const status = getVisitStatus();
      const formattedDate = formatDateParts(visit.created_at);

      return [
        formattedDate.date,
        formattedDate.time,
        visit.operator_id || "Sin operador",
        visit.client_name || "Sin cliente",
        visit.station_name || "Sin estación",
        formatConsumption(visit.consumption),
        visit.notes?.trim() || "Sin notas",
        getStatusLabel(status),
        visit.photo_url ? "Sí" : "No",
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => escapeCsvValue(String(cell))).join(","))
      .join("\n");

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStamp = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `visitas-dashboard-${dateStamp}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="grid gap-4 md:grid-cols-3">
        <KpiCard
          label="Total visitas"
          value={filteredVisits.length}
          tone="slate"
        />
        <KpiCard label="Con foto" value={withPhoto} tone="emerald" />
        <KpiCard label="Sin foto" value={withoutPhoto} tone="amber" />
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_-35px_rgba(15,23,42,0.45)]">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Registro de visitas
                </h2>
                <p className="text-sm text-slate-500">
                  Ordenado por fecha de captura descendente.
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-sky-700">
                  Las 5 visitas m&aacute;s recientes aparecen resaltadas
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportCsv}
                  disabled={filteredVisits.length === 0}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Exportar CSV
                </button>
                <div className="text-sm text-slate-500">
                  {filteredVisits.length} resultados
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_180px_180px_auto]">
              <FilterField label="Cliente">
                <select
                  value={selectedClient}
                  onChange={(event) => setSelectedClient(event.target.value)}
                  className={filterInputClassName}
                >
                  <option value="">Todos los clientes</option>
                  {clientOptions.map((client) => (
                    <option key={client} value={client}>
                      {client}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField label="Operador">
                <select
                  value={selectedOperator}
                  onChange={(event) => setSelectedOperator(event.target.value)}
                  className={filterInputClassName}
                >
                  <option value="">Todos los operadores</option>
                  {operatorOptions.map((operator) => (
                    <option key={operator} value={operator}>
                      {operator}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField label="Fecha desde">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(event) => setDateFrom(event.target.value)}
                  className={filterInputClassName}
                />
              </FilterField>

              <FilterField label="Fecha hasta">
                <input
                  type="date"
                  value={dateTo}
                  onChange={(event) => setDateTo(event.target.value)}
                  className={filterInputClassName}
                />
              </FilterField>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  disabled={!hasActiveFilters}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-950 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Operador</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Estaci&oacute;n</th>
                <th className="px-6 py-4">Consumo</th>
                <th className="px-6 py-4">Notas</th>
                <th className="px-6 py-4">Foto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredVisits.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No hay visitas que coincidan con los filtros actuales.
                  </td>
                </tr>
              ) : (
                filteredVisits.map((visit, index) => {
                  const status = getVisitStatus();
                  const formattedDate = formatDateParts(visit.created_at);
                  const isRecentVisit = index < 5;

                  return (
                    <tr
                      key={visit.id}
                      onClick={() => setSelectedVisit(visit)}
                      className={`align-top cursor-pointer ${isRecentVisit ? "bg-sky-50/70" : ""} transition hover:bg-slate-50`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        <div className="flex min-w-[110px] flex-col">
                          {isRecentVisit ? (
                            <span className="mb-2 inline-flex w-fit rounded-full bg-sky-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                              Reciente
                            </span>
                          ) : null}
                          <span>{formattedDate.date}</span>
                          <span className="text-xs font-medium text-slate-500">
                            {formattedDate.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <StatusBadge status={status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {visit.operator_id || "Sin operador"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {visit.client_name || "Sin cliente"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {visit.station_name || "Sin estaci&oacute;n"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatConsumption(visit.consumption)}
                      </td>
                      <td className="max-w-xs px-6 py-4 text-sm leading-6 text-slate-600">
                        <p className="line-clamp-3">
                          {visit.notes?.trim() || "Sin notas"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {visit.photo_url ? (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleOpenPhoto(visit);
                            }}
                            className="inline-flex rounded-full border border-slate-300 px-3 py-1.5 font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-950"
                          >
                            Ver foto
                          </button>
                        ) : (
                          <span className="text-slate-400">Sin foto</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <VisitDetailModal
        visit={selectedVisit}
        onClose={() => setSelectedVisit(null)}
        onOpenPhoto={handleOpenPhoto}
      />
      <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </>
  );
}
