import type { IconName } from "@/src/components/dashboard/icons";

export type UserRole =
  | "root-admin"
  | "supervisor"
  | "operador"
  | "cliente";

export type PageMeta = {
  title: string;
  description: string;
  placeholder: string;
  badge?: string;
};

export type NavigationLeaf = {
  label: string;
  href: string;
  icon: IconName;
  roles?: UserRole[];
  page: PageMeta;
};

export type NavigationGroup = {
  label: string;
  icon: IconName;
  roles?: UserRole[];
  children: NavigationLeaf[];
};

export type NavigationItem = NavigationLeaf | NavigationGroup;

function createLeaf(
  label: string,
  href: string,
  icon: IconName,
  description: string,
  placeholder: string,
  roles: UserRole[] = ["root-admin", "supervisor", "operador", "cliente"],
): NavigationLeaf {
  return {
    label,
    href,
    icon,
    roles,
    page: {
      title: label,
      description,
      placeholder,
      badge: "Próximamente",
    },
  };
}

export const dashboardHome = createLeaf(
  "Inicio",
  "/dashboard",
  "dashboard",
  "Vista general con KPIs, actividad reciente, alertas y resumen operativo del servicio de fumigación.",
  "Aquí se concentrarán los indicadores clave, la actividad reciente y las alertas operativas del sistema.",
);

export const navigationItems: NavigationItem[] = [
  dashboardHome,
  {
    label: "Operación",
    icon: "operation",
    roles: ["root-admin", "supervisor", "operador"],
    children: [
      createLeaf(
        "Órdenes de Trabajo / Recorridos",
        "/dashboard/ordenes-trabajo",
        "workOrders",
        "Programación y seguimiento de recorridos, órdenes de trabajo e inspecciones en campo.",
        "Aquí se visualizarán y administrarán los recorridos e inspecciones programadas.",
        ["root-admin", "supervisor", "operador"],
      ),
      createLeaf(
        "Visitas / Inspecciones",
        "/dashboard/visitas",
        "visits",
        "Control de visitas ejecutadas, inspecciones levantadas y trazabilidad de servicio.",
        "Aquí se consolidará la ejecución de visitas e inspecciones realizadas en sitio.",
        ["root-admin", "supervisor", "operador"],
      ),
      createLeaf(
        "Incidencias",
        "/dashboard/incidencias",
        "incidents",
        "Registro de hallazgos, desviaciones operativas y eventos relevantes detectados en campo.",
        "Aquí se administrarán las incidencias operativas y excepciones detectadas durante el servicio.",
        ["root-admin", "supervisor", "operador"],
      ),
      createLeaf(
        "Evidencias Fotográficas",
        "/dashboard/evidencias",
        "evidence",
        "Consulta y validación de evidencia fotográfica vinculada a recorridos, inspecciones y hallazgos.",
        "Aquí se concentrarán las evidencias fotográficas capturadas durante la operación.",
        ["root-admin", "supervisor", "operador"],
      ),
      createLeaf(
        "Sincronización / Operación Offline",
        "/dashboard/sincronizacion",
        "sync",
        "Monitoreo de sincronización, colas pendientes y operación desconectada en dispositivos móviles.",
        "Aquí se supervisará la sincronización de datos y la operación offline del personal en campo.",
        ["root-admin", "supervisor", "operador"],
      ),
    ],
  },
  {
    label: "Catálogos",
    icon: "catalogs",
    roles: ["root-admin", "supervisor"],
    children: [
      createLeaf(
        "Clientes",
        "/dashboard/catalogos/clientes",
        "clients",
        "Administración base de clientes, cuentas y entidades atendidas por el servicio.",
        "Aquí se administrará el catálogo de clientes y entidades atendidas por el servicio.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Estaciones",
        "/dashboard/catalogos/estaciones",
        "stations",
        "Control maestro de estaciones antiplaga asociadas a clientes, ubicaciones y recorridos.",
        "Aquí se administrarán las estaciones antiplaga asignadas por cliente y ubicación.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Tipos de Estación",
        "/dashboard/catalogos/tipos-estacion",
        "stationTypes",
        "Configuración de tipologías, variantes y clasificación técnica de estaciones.",
        "Aquí se administrarán los tipos de estación y sus configuraciones base.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Áreas de Trabajo",
        "/dashboard/catalogos/areas-trabajo",
        "areas",
        "Definición de áreas, sectores o unidades operativas por cliente o instalación.",
        "Aquí se configurarán las áreas o sectores operativos dentro de cada cliente.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Zonas de Trabajo",
        "/dashboard/catalogos/zonas-trabajo",
        "zones",
        "Segmentación geográfica y operativa para asignación, cobertura y supervisión.",
        "Aquí se configurarán las zonas geográficas u operativas para asignación y monitoreo.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Documentos",
        "/dashboard/catalogos/documentos",
        "documents",
        "Catálogo base de tipos documentales, plantillas y categorías de cumplimiento.",
        "Aquí se administrará la documentación operativa, técnica y de cumplimiento.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Usuarios",
        "/dashboard/catalogos/usuarios",
        "users",
        "Gestión base de usuarios, accesos y perfiles del ecosistema administrativo.",
        "Aquí se administrarán los accesos, perfiles y permisos del sistema.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Operadores",
        "/dashboard/catalogos/operadores",
        "operators",
        "Configuración del personal operativo que ejecuta servicios en campo.",
        "Aquí se administrará el catálogo de operadores asignados a la operación de campo.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Supervisores",
        "/dashboard/catalogos/supervisores",
        "supervisors",
        "Control de responsables de supervisión, validación y seguimiento operativo.",
        "Aquí se administrará el catálogo de supervisores y responsables de seguimiento.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Roles y Permisos",
        "/dashboard/catalogos/roles",
        "roles",
        "Definición de roles, capacidades y visibilidad para futuras reglas RBAC.",
        "Aquí se administrarán los roles, permisos y políticas de acceso del sistema.",
        ["root-admin"],
      ),
      createLeaf(
        "Tipos de Incidencia",
        "/dashboard/catalogos/tipos-incidencia",
        "incidents",
        "Parámetros para clasificar incidentes, desviaciones y causas operativas.",
        "Aquí se administrarán los tipos de incidencia y criterios de clasificación.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Checklists / Plantillas de Inspección",
        "/dashboard/catalogos/checklists",
        "checklists",
        "Definición de plantillas de inspección, listas de revisión y estándares operativos.",
        "Aquí se administrarán los checklists y plantillas de inspección para campo.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Estatus Operativos",
        "/dashboard/catalogos/estatus",
        "status",
        "Configuración de estados operativos, de atención y cumplimiento.",
        "Aquí se administrarán los estatus operativos disponibles para la plataforma.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Dispositivos / Equipos móviles",
        "/dashboard/catalogos/dispositivos",
        "devices",
        "Inventario de dispositivos móviles, equipos asignados y condiciones de sincronización.",
        "Aquí se administrarán los dispositivos y equipos móviles utilizados en la operación.",
        ["root-admin", "supervisor"],
      ),
    ],
  },
  {
    label: "Monitoreo",
    icon: "monitoring",
    roles: ["root-admin", "supervisor", "cliente"],
    children: [
      createLeaf(
        "Mapa / Cobertura",
        "/dashboard/monitoreo/mapa",
        "map",
        "Visualización territorial de cobertura, estaciones activas y rutas supervisadas.",
        "Aquí se integrará el mapa operativo con cobertura, estaciones y contexto geográfico.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Estaciones por Cliente",
        "/dashboard/monitoreo/estaciones-cliente",
        "stations",
        "Seguimiento consolidado de estaciones por cuenta, sitio y nivel de servicio.",
        "Aquí se visualizará la distribución de estaciones por cliente y ubicación.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Actividad de Operadores",
        "/dashboard/monitoreo/operadores",
        "operators",
        "Monitoreo de actividad, productividad, cumplimiento y trazabilidad por operador.",
        "Aquí se monitoreará la actividad de operadores y su ejecución en campo.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Alertas",
        "/dashboard/monitoreo/alertas",
        "alerts",
        "Concentrado de alertas activas, anomalías y señales críticas de la operación.",
        "Aquí se centralizarán las alertas operativas y eventos críticos a atender.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Pendientes de Atención",
        "/dashboard/monitoreo/pendientes",
        "pending",
        "Panel para seguimiento de tareas abiertas, compromisos y pendientes de resolución.",
        "Aquí se visualizarán los pendientes de atención derivados de la operación y el monitoreo.",
        ["root-admin", "supervisor"],
      ),
    ],
  },
  {
    label: "Documentación",
    icon: "documents",
    roles: ["root-admin", "supervisor", "cliente"],
    children: [
      createLeaf(
        "Repositorio Documental",
        "/dashboard/documentacion/repositorio",
        "repository",
        "Biblioteca central de documentos operativos, técnicos, normativos y contractuales.",
        "Aquí se integrará el repositorio documental del sistema.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Informes Generados",
        "/dashboard/documentacion/informes",
        "reports",
        "Consulta de informes emitidos automáticamente o preparados para entrega.",
        "Aquí se administrarán los informes generados para operación y clientes.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Evidencias",
        "/dashboard/documentacion/evidencias",
        "evidence",
        "Archivo de evidencia documental y fotográfica asociada a servicios ejecutados.",
        "Aquí se integrarán las evidencias documentales y de soporte del servicio.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Auditoría Documental",
        "/dashboard/documentacion/auditoria",
        "logs",
        "Seguimiento de revisiones, trazabilidad documental y cumplimiento de auditoría.",
        "Aquí se concentrará la auditoría documental y el seguimiento de cumplimiento.",
        ["root-admin", "supervisor"],
      ),
    ],
  },
  {
    label: "Reportes",
    icon: "reports",
    roles: ["root-admin", "supervisor", "cliente"],
    children: [
      createLeaf(
        "Reporte por Cliente",
        "/dashboard/reportes/clientes",
        "clients",
        "Indicadores y resultados consolidados por cliente, contrato o cuenta.",
        "Aquí se concentrarán los reportes e indicadores generados por cliente.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Reporte por Operador",
        "/dashboard/reportes/operadores",
        "operators",
        "Métricas de desempeño, cobertura y cumplimiento por operador.",
        "Aquí se concentrarán los reportes de desempeño por operador.",
        ["root-admin", "supervisor"],
      ),
      createLeaf(
        "Reporte por Zona",
        "/dashboard/reportes/zonas",
        "zones",
        "Vista analítica segmentada por zona geográfica u operativa.",
        "Aquí se concentrarán los reportes de actividad y cumplimiento por zona.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Reporte por Área",
        "/dashboard/reportes/areas",
        "areas",
        "Resultados agregados por área, sector o unidad de trabajo.",
        "Aquí se concentrarán los reportes por área operativa.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Reporte de Incidencias",
        "/dashboard/reportes/incidencias",
        "incidents",
        "Análisis de incidencias, frecuencia, severidad y atención.",
        "Aquí se concentrarán los reportes de incidencias detectadas en la operación.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Reporte de Cumplimiento",
        "/dashboard/reportes/cumplimiento",
        "status",
        "Seguimiento del cumplimiento operativo, documental y de servicio.",
        "Aquí se concentrarán los reportes de cumplimiento y nivel de servicio.",
        ["root-admin", "supervisor", "cliente"],
      ),
      createLeaf(
        "Exportaciones",
        "/dashboard/reportes/exportaciones",
        "documents",
        "Centro de generación y descarga de archivos de salida y entregables.",
        "Aquí se administrarán las exportaciones y salidas de información.",
        ["root-admin", "supervisor"],
      ),
    ],
  },
  {
    label: "Administración",
    icon: "admin",
    roles: ["root-admin"],
    children: [
      createLeaf(
        "Configuración General",
        "/dashboard/admin/configuracion",
        "settings",
        "Ajustes globales del sistema, identidad operativa y configuración transversal.",
        "Aquí se integrará la configuración general de la plataforma.",
        ["root-admin"],
      ),
      createLeaf(
        "Parámetros del Sistema",
        "/dashboard/admin/parametros",
        "settings",
        "Parámetros base para reglas de negocio, umbrales y comportamiento del sistema.",
        "Aquí se administrarán los parámetros generales del sistema.",
        ["root-admin"],
      ),
      createLeaf(
        "Bitácora / Logs",
        "/dashboard/admin/logs",
        "logs",
        "Trazabilidad de eventos administrativos, acciones críticas y auditoría técnica.",
        "Aquí se concentrará la bitácora de eventos y logs administrativos.",
        ["root-admin"],
      ),
      createLeaf(
        "Integraciones",
        "/dashboard/admin/integraciones",
        "integrations",
        "Conectores, sincronización con servicios externos y puntos de integración.",
        "Aquí se administrarán las integraciones del sistema con servicios externos.",
        ["root-admin"],
      ),
      createLeaf(
        "Respaldos",
        "/dashboard/admin/respaldos",
        "backups",
        "Gestión de respaldos, restauración y continuidad operativa de la plataforma.",
        "Aquí se administrarán los respaldos y la continuidad operativa del sistema.",
        ["root-admin"],
      ),
    ],
  },
  {
    label: "Ayuda",
    icon: "help",
    roles: ["root-admin", "supervisor", "operador", "cliente"],
    children: [
      createLeaf(
        "Manual de Usuario",
        "/dashboard/ayuda/manual",
        "manual",
        "Acceso a guías, onboarding y documentación de uso para cada perfil.",
        "Aquí se integrará el manual de usuario y las guías de operación.",
      ),
      createLeaf(
        "Soporte",
        "/dashboard/ayuda/soporte",
        "support",
        "Canales de soporte, seguimiento de solicitudes y atención de incidencias funcionales.",
        "Aquí se integrará el módulo de soporte y atención a usuarios.",
      ),
    ],
  },
];

export function isNavigationGroup(
  item: NavigationItem,
): item is NavigationGroup {
  return "children" in item;
}

export function getVisibleNavigation(
  role: UserRole = "root-admin",
): NavigationItem[] {
  return navigationItems
    .filter((item) => !item.roles || item.roles.includes(role))
    .map((item) => {
      if (!isNavigationGroup(item)) {
        return item;
      }

      return {
        ...item,
        children: item.children.filter(
          (child) => !child.roles || child.roles.includes(role),
        ),
      };
    })
    .filter((item) => !isNavigationGroup(item) || item.children.length > 0);
}

export function flattenNavigation(items: NavigationItem[] = navigationItems) {
  return items.flatMap((item) =>
    isNavigationGroup(item) ? item.children : [item],
  );
}

export const pageRegistry = Object.fromEntries(
  flattenNavigation().map((item) => [item.href, item]),
) satisfies Record<string, NavigationLeaf>;

export function getPageByPath(pathname: string) {
  return pageRegistry[pathname];
}

export function getBreadcrumbs(pathname: string) {
  const page = getPageByPath(pathname);

  if (!page) {
    return [];
  }

  const breadcrumbs = [
    {
      label: dashboardHome.label,
      href: dashboardHome.href,
    },
  ];

  for (const item of navigationItems) {
    if (isNavigationGroup(item)) {
      const child = item.children.find((entry) => entry.href === pathname);

      if (child) {
        breadcrumbs.push({
          label: item.label,
          href: "",
        });

        if (child.href !== dashboardHome.href) {
          breadcrumbs.push({
            label: child.label,
            href: child.href,
          });
        }

        return breadcrumbs;
      }
    }
  }

  if (page.href !== dashboardHome.href) {
    breadcrumbs.push({
      label: page.label,
      href: page.href,
    });
  }

  return breadcrumbs;
}
