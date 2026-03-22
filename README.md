# Admin Dashboard

Dashboard web minimo en Next.js para supervisar visitas capturadas en Supabase.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- `@supabase/supabase-js`

## Requisitos

- Node.js 20+ recomendado
- Variables de entorno configuradas en `.env.local`

## Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

La aplicacion consulta la view publica `public.visits_dashboard` con estas columnas:

- `id`
- `operator_id`
- `client_name`
- `station_name`
- `consumption`
- `notes`
- `photo_url`
- `created_at`

## Correr en local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: entorno local
- `npm run build`: build de produccion
- `npm run start`: correr build de produccion
- `npm run lint`: validar codigo

## Funcionalidad incluida

- Dashboard principal con 3 KPIs:
  - total visitas
  - visitas con foto
  - visitas sin foto
- Tabla operativa ordenada por `created_at desc`
- Boton de recarga manual
- Boton `Ver foto` por registro cuando existe `photo_url`
- Conexion centralizada en `lib/supabase.ts`

## Notas

- No hay autenticacion en esta primera version.
- La app usa las variables `NEXT_PUBLIC_*` para poder integrarse rapido al MVP.
