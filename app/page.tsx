import { DashboardHomeContent } from "@/src/components/dashboard/dashboard-home-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(208,228,255,0.45),_transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <DashboardHomeContent />
      </div>
    </main>
  );
}
