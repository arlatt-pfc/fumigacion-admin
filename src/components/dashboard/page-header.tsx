import Link from "next/link";
import { getBreadcrumbs } from "@/src/config/navigation";

export function PageHeader({
  pathname,
  title,
  description,
  badge = "Próximamente",
}: {
  pathname: string;
  title: string;
  description: string;
  badge?: string;
}) {
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="flex flex-col gap-5 rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.28)] backdrop-blur sm:p-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={`${breadcrumb.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span className="text-slate-300">/</span> : null}
                {breadcrumb.href && !isLast ? (
                  <Link
                    href={breadcrumb.href}
                    className="rounded-full px-2 py-1 hover:bg-slate-100 hover:text-slate-700"
                  >
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-semibold text-slate-700" : ""}>
                    {breadcrumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
          {badge}
        </span>
      </div>
    </header>
  );
}
