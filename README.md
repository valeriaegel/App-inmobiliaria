# 🏡 Pagina Web Inmobiliaria

Este proyecto tiene como objetivo es mostrar las propiedades disponibles en alquiler y venta, los servicios de la empresa y ofrecer formularios de contacto.

Forma parte de una arquitectura de microservicios, donde se comunica con el API Backend (NestJS) para obtener toda la información dinámica.

## 🚀 Tecnologías Utilizadas

| Tecnología | Versión / Tipo | Descripción |
| :--- | :--- | :--- |
| **Framework Principal** | React v18+ | Biblioteca para construir la interfaz de usuario. |
| **Bundler / Build** | Vite | Herramienta de construcción rápida y servidor de desarrollo. |
| **Lenguaje** | JavaScript (ES6+) | Lenguaje principal de desarrollo. |
| **Estilos** | Tailwind CSS | Framework de CSS *utility-first* para un diseño rápido y responsive. |
| **API** | Fetch / Axios | Gestión de peticiones HTTP al backend. |

## ⚙️ Primeros Pasos

Sigue estos pasos para poner en marcha el proyecto en tu entorno de desarrollo local.

### 1. Clonación del Repositorio

Asegúrate de clonar este repositorio (si aún no lo has hecho)

```bash
git clone [URL_DE_TU_REPOSITORIO]
```

### 2. Instalación de Dependencias
Ejecuta el siguiente comando para instalar todos los paquetes necesarios definidos en package.json:
```bash
npm install
```

### 3. Configuración de Variables de Entorno

Este proyecto requiere que el API Backend esté corriendo y acceso a los servicios de Google Maps. Debes configurar las siguientes variables de entorno en el archivo `.env` de la raíz.

Crea un archivo llamado **`.env`** en la carpeta principal (`frontend/`) y añade las siguientes variables:

```dotenv
# 1. URL base de tu API NestJS y clave token (API restringida)
VITE_STRAPI_BASE_URL="http://localhost:3000/api"

VITE_STRAPI_API_TOKEN="TU_CLAVE_TOKEN"

# 2. Clave de la API de Google Maps Platform (necesaria para servicios de ubicación)
VITE_GOOGLE_MAPS_API_KEY="TU_CLAVE_AQUI"
```
**Nota:** Las variables de entorno en Vite deben comenzar con VITE_.

### 4. Ejecución del Servidor de Desarrollo
Una vez instaladas las dependencias y configurada la variable de entorno, puedes iniciar el servidor de desarrollo: 
```bash
npm run dev
# o
yarn dev
```
La pagina web estará disponible típicamente en http://localhost:5173.

---