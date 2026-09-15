/**
 * Formatea un texto con la primera letra en mayúscula y el resto en minúsculas (Sentence case).
 * Ejemplo: "HERMOSA CASA CON PATIO" -> "Hermosa casa con patio"
 * Ejemplo: "departamento en alquiler" -> "Departamento en alquiler"
 */
export function capitalizarTitulo(texto) {
    if (!texto || typeof texto !== 'string') return '';
    const limpio = texto.trim();
    if (!limpio) return '';
    return limpio.charAt(0).toUpperCase() + limpio.slice(1).toLowerCase();
}
