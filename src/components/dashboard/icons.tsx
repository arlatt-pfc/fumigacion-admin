import type { ReactElement, ReactNode, SVGProps } from "react";

export type IconName =
  | "dashboard"
  | "operation"
  | "workOrders"
  | "visits"
  | "incidents"
  | "evidence"
  | "sync"
  | "catalogs"
  | "clients"
  | "stations"
  | "stationTypes"
  | "areas"
  | "zones"
  | "documents"
  | "users"
  | "operators"
  | "supervisors"
  | "roles"
  | "checklists"
  | "status"
  | "devices"
  | "monitoring"
  | "map"
  | "alerts"
  | "pending"
  | "repository"
  | "reports"
  | "admin"
  | "settings"
  | "logs"
  | "integrations"
  | "backups"
  | "help"
  | "manual"
  | "support"
  | "chevron"
  | "menu"
  | "close"
  | "logout";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({
  children,
  viewBox = "0 0 24 24",
  ...props
}: IconProps & { children: ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const iconMap: Record<IconName, (props: IconProps) => ReactElement> = {
  dashboard: (props) => (
    <BaseIcon {...props}>
      <path d="M4 13h7V4H4z" />
      <path d="M13 20h7v-9h-7z" />
      <path d="M13 11h7V4h-7z" />
      <path d="M4 20h7v-5H4z" />
    </BaseIcon>
  ),
  operation: (props) => (
    <BaseIcon {...props}>
      <path d="M14 4l6 6-8.5 8.5H5.5v-6z" />
      <path d="M13 5l6 6" />
    </BaseIcon>
  ),
  workOrders: (props) => (
    <BaseIcon {...props}>
      <path d="M8 6h10" />
      <path d="M8 12h10" />
      <path d="M8 18h10" />
      <path d="M4 6h.01" />
      <path d="M4 12h.01" />
      <path d="M4 18h.01" />
    </BaseIcon>
  ),
  visits: (props) => (
    <BaseIcon {...props}>
      <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </BaseIcon>
  ),
  incidents: (props) => (
    <BaseIcon {...props}>
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </BaseIcon>
  ),
  evidence: (props) => (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 11l2.5 2.5L13 11l4 4" />
      <circle cx="8" cy="9" r="1" />
    </BaseIcon>
  ),
  sync: (props) => (
    <BaseIcon {...props}>
      <path d="M3 12a8 8 0 0 1 13.66-5.66L19 8" />
      <path d="M21 12a8 8 0 0 1-13.66 5.66L5 16" />
      <path d="M19 3v5h-5" />
      <path d="M5 21v-5h5" />
    </BaseIcon>
  ),
  catalogs: (props) => (
    <BaseIcon {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5v-13A2.5 2.5 0 0 1 6.5 3z" />
    </BaseIcon>
  ),
  clients: (props) => (
    <BaseIcon {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </BaseIcon>
  ),
  stations: (props) => (
    <BaseIcon {...props}>
      <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" />
      <path d="M9.5 10.5h5" />
      <path d="M12 8v5" />
    </BaseIcon>
  ),
  stationTypes: (props) => (
    <BaseIcon {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <path d="M16.5 14v6" />
      <path d="M13.5 17h6" />
    </BaseIcon>
  ),
  areas: (props) => (
    <BaseIcon {...props}>
      <path d="M3 7h18" />
      <path d="M7 3v18" />
      <path d="M3 17h18" />
      <path d="M17 3v18" />
    </BaseIcon>
  ),
  zones: (props) => (
    <BaseIcon {...props}>
      <path d="M3 9l9-6 9 6-9 6-9-6z" />
      <path d="M3 15l9 6 9-6" />
      <path d="M3 9v6" />
      <path d="M21 9v6" />
    </BaseIcon>
  ),
  documents: (props) => (
    <BaseIcon {...props}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </BaseIcon>
  ),
  users: (props) => (
    <BaseIcon {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </BaseIcon>
  ),
  operators: (props) => (
    <BaseIcon {...props}>
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      <path d="M19 8l2 2-2 2" />
    </BaseIcon>
  ),
  supervisors: (props) => (
    <BaseIcon {...props}>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
      <path d="M18 4l3 3" />
    </BaseIcon>
  ),
  roles: (props) => (
    <BaseIcon {...props}>
      <circle cx="8" cy="8" r="3" />
      <path d="M13 8h8" />
      <path d="M16 5v6" />
      <path d="M4 21a4 4 0 0 1 8 0" />
      <path d="M14 18h7" />
    </BaseIcon>
  ),
  checklists: (props) => (
    <BaseIcon {...props}>
      <path d="M9 11l2 2 4-4" />
      <path d="M8 4h8" />
      <rect x="4" y="3" width="16" height="18" rx="2" />
    </BaseIcon>
  ),
  status: (props) => (
    <BaseIcon {...props}>
      <path d="M5 12l4 4L19 6" />
    </BaseIcon>
  ),
  devices: (props) => (
    <BaseIcon {...props}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </BaseIcon>
  ),
  monitoring: (props) => (
    <BaseIcon {...props}>
      <path d="M3 12h4l3-7 4 14 3-7h4" />
    </BaseIcon>
  ),
  map: (props) => (
    <BaseIcon {...props}>
      <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
      <path d="M9 3v15" />
      <path d="M15 6v15" />
    </BaseIcon>
  ),
  alerts: (props) => (
    <BaseIcon {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </BaseIcon>
  ),
  pending: (props) => (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </BaseIcon>
  ),
  repository: (props) => (
    <BaseIcon {...props}>
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13l-4-2-4 2-4-2-4 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </BaseIcon>
  ),
  reports: (props) => (
    <BaseIcon {...props}>
      <path d="M4 19h16" />
      <path d="M7 15V9" />
      <path d="M12 15V5" />
      <path d="M17 15v-3" />
    </BaseIcon>
  ),
  admin: (props) => (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.64 0 1.23.26 1.66.69.43.43.69 1.02.69 1.66s-.26 1.23-.69 1.66c-.43.43-1.02.69-1.66.69H19a1.65 1.65 0 0 0-.6 1.3z" />
    </BaseIcon>
  ),
  settings: (props) => (
    <BaseIcon {...props}>
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </BaseIcon>
  ),
  logs: (props) => (
    <BaseIcon {...props}>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </BaseIcon>
  ),
  integrations: (props) => (
    <BaseIcon {...props}>
      <path d="M8 7V5a3 3 0 1 1 6 0v2" />
      <path d="M10 19v-2a3 3 0 1 1 6 0v2" />
      <path d="M14 7h4a3 3 0 1 1 0 6h-4" />
      <path d="M10 17H6a3 3 0 1 1 0-6h4" />
    </BaseIcon>
  ),
  backups: (props) => (
    <BaseIcon {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </BaseIcon>
  ),
  help: (props) => (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4" />
      <path d="M12 17h.01" />
    </BaseIcon>
  ),
  manual: (props) => (
    <BaseIcon {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5v-13A2.5 2.5 0 0 1 6.5 3z" />
      <path d="M9 8h6" />
    </BaseIcon>
  ),
  support: (props) => (
    <BaseIcon {...props}>
      <path d="M18 10a6 6 0 0 0-12 0v4" />
      <path d="M6 18a2 2 0 0 0 2 2h1v-6H8a2 2 0 0 0-2 2z" />
      <path d="M18 18a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" />
      <path d="M12 20v1" />
    </BaseIcon>
  ),
  chevron: (props) => (
    <BaseIcon {...props}>
      <path d="M9 6l6 6-6 6" />
    </BaseIcon>
  ),
  menu: (props) => (
    <BaseIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </BaseIcon>
  ),
  close: (props) => (
    <BaseIcon {...props}>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </BaseIcon>
  ),
  logout: (props) => (
    <BaseIcon {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </BaseIcon>
  ),
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = iconMap[name];

  return <Component className={className} />;
}
