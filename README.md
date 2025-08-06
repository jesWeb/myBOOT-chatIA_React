# myBot-ReactIA

Este proyecto es una aplicación **frontend** desarrollada con **React**, **TypeScript** y **Vite**. Su objetivo principal es ofrecer una interfaz moderna y rápida para interactuar con un bot de inteligencia artificial, permitiendo a los usuarios enviar mensajes, adjuntar archivos y descargar respuestas en diferentes formatos.

> **Importante:**  
> Este repositorio contiene únicamente el código **frontend**. La lógica de inteligencia artificial y procesamiento de mensajes se realiza mediante el consumo de una **API externa** (por ejemplo, Groq/OpenAI).  
> No incluye ningún componente backend propio ni almacenamiento de datos en servidor.

## Características principales

- Chat interactivo con IA.
- Adjuntar y analizar archivos (PDF, Word, Excel, TXT).
- Descargar respuestas en PDF, Word, Excel o TXT.
- Gestión local de documentos generados.
- Validación de formularios y archivos.
- Interfaz responsiva y moderna con TailwindCSS.

## Estructura del proyecto

```
.env
.gitignore
eslint.config.js
index.html
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
public/
src/
  App.tsx
  main.tsx
  components/
  pages/
  store/
  types/
  utils/
```

## Instalación y uso

1. Instala las dependencias:
   ```sh
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```
3. Accede a la aplicación en `http://localhost:5173` (o el puerto que indique Vite).

## Configuración de la API

Debes proporcionar tu clave de API en el archivo `.env` para que la aplicación pueda comunicarse con el servicio de IA externo.

## Scripts disponibles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Compila la aplicación para producción.
- `npm run preview` — Previsualiza la versión de producción.
- `npm run lint` — Ejecuta ESLint.

## Expansión de la configuración de ESLint

Si desarrollas una aplicación para producción, se recomienda habilitar reglas de linting con tipado estricto. Consulta la sección correspondiente en este README para más detalles.

## Licencia

Este proyecto es solo frontend y está pensado para integrarse con APIs externas. Puedes modificarlo y adaptarlo según tus necesidades.

---