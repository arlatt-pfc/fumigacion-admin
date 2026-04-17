import { Icon } from "@/src/components/dashboard/icons";
import type { NavigationLeaf } from "@/src/config/navigation";
import { PageHeader } from "@/src/components/dashboard/page-header";

export function PlaceholderPage({ page }: { page: NavigationLeaf }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        pathname={page.href}
        title={page.page.title}
        description={page.page.description}
        badge={page.page.badge}
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-slate-950 p-3 text-white shadow-lg shadow-slate-950/20">
              <Icon name={page.icon} className="h-6 w-6" />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Módulo base
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                {page.label}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                {page.page.placeholder}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-5">
              <p className="text-sm font-semibold text-slate-700">Espacio reservado</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Aquí se montarán componentes operativos, filtros y acciones específicas
                de este módulo en la siguiente fase.
              </p>
            </div>
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-5">
              <p className="text-sm font-semibold text-slate-700">Arquitectura preparada</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                La ruta, navegación, breadcrumb y punto de entrada ya quedan listos
                para crecer con CRUDs, permisos y vistas analíticas.
              </p>
            </div>
          </div>
        </article>

        <aside className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Estado del módulo
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-3xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200/70">
              <p className="text-sm font-semibold">Navegación habilitada</p>
              <p className="mt-1 text-sm leading-6 text-emerald-800/80">
                La sección ya aparece en el sidebar y responde en desktop y móvil.
              </p>
            </div>
            <div className="rounded-3xl bg-amber-50 p-4 text-amber-900 ring-1 ring-amber-200/70">
              <p className="text-sm font-semibold">Implementación funcional pendiente</p>
              <p className="mt-1 text-sm leading-6 text-amber-800/80">
                En esta fase no se integran formularios, persistencia ni reglas de negocio.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-4 text-white">
              <p className="text-sm font-semibold">Próximo paso sugerido</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Definir las entidades, permisos y flujos de captura antes de construir el
                CRUD definitivo.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
