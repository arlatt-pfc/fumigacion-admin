import { notFound } from "next/navigation";
import { PlaceholderPage } from "@/src/components/dashboard/placeholder-page";
import { getPageByPath } from "@/src/config/navigation";

function resolvePath(slug: string[]) {
  return `/dashboard/${slug.join("/")}`;
}

export default async function DashboardSectionPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const pathname = resolvePath(slug);
  const page = getPageByPath(pathname);

  if (!page || pathname === "/dashboard") {
    notFound();
  }

  return <PlaceholderPage page={page} />;
}
