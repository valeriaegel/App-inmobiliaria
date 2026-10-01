/**
 * Normaliza y valida una coordenada geográfica (latitud o longitud).
 * Maneja casos donde:
 * - El valor viene como string o número.
 * - Se usó coma en lugar de punto decimal.
 * - Faltó el punto decimal por error de carga en el CMS (ej: -32463869 en vez de -32.463869).
 * - El valor está fuera del rango geográfico válido (-90 a 90 para lat, -180 a 180 para lng).
 */
export function normalizarCoordenada(valor, esLatitud = true) {
    if (valor == null || valor === '') return null;
    let num = typeof valor === 'number' ? valor : parseFloat(String(valor).trim().replace(',', '.'));
    if (isNaN(num)) return null;

    const maxAbs = esLatitud ? 90 : 180;

    // Si ya es un valor válido dentro del rango
    if (Math.abs(num) <= maxAbs) {
        // Evitamos 0 absoluto (suele ser valor por defecto erróneo en el océano)
        if (num === 0) return null;
        return num;
    }

    // Si es un valor grande porque faltó el punto decimal (ej: -32463869 o -58606396)
    const str = String(Math.abs(num)).replace('.', '');
    if (str.length > 2) {
        const conPunto = str.slice(0, 2) + '.' + str.slice(2);
        const ajustado = (num < 0 ? -1 : 1) * parseFloat(conPunto);
        if (!isNaN(ajustado) && Math.abs(ajustado) <= maxAbs && ajustado !== 0) {
            return ajustado;
        }
    }

    return null;
}
