# Pone La Pava - Tienda Online 🧉

Este proyecto es la nueva tienda online para **Pone La Pava**, desarrollada con un stack moderno enfocado en velocidad, estética premium y facilidad de gestión.

## Tech Stack
- **Frontend:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **CMS (Backend):** Sanity Headless CMS
- **Chat:** n8n Webhook Integration
- **Despliegue:** Hostinger (Node.js App)

## Estructura del Proyecto
- `/src/app`: Rutas y páginas de la web.
- `/src/components`: Componentes reutilizables (como el ChatWidget).
- `/src/sanity`: Configuración y esquemas de los productos.
- `/public`: Imágenes y assets estáticos.

## Cómo empezar (Desarrollo local)

1. Instalar dependencias:
```bash
npm install
```

2. Correr el servidor:
```bash
npm run dev
```

3. Abrir [http://localhost:3000](http://localhost:3000) para ver la web.

## Gestión de Productos (Sanity Studio)

Podés acceder al panel de administración directamente desde la web en:
[http://localhost:3000/studio](http://localhost:3000/studio)

*(Requiere configurar el Project ID en `.env.local`)*

## Despliegue en Hostinger

El proyecto está configurado para correr en el servicio de Node.js de Hostinger. Se recomienda usar GitHub Actions para despliegues automáticos.
