const STRAPI_BASE_URL= import.meta.env.VITE_STRAPI_BASE_URL;
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export function fetchFromStrapi(endpoint) {
    return fetch(`${STRAPI_BASE_URL}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`,  
        },
    });
}