/**
 * Formatea un valor numérico agregando puntos como separadores de miles
 * Ejemplo: 4000000, 'Peso' -> '$ 4.000.000'
 * Ejemplo: 150000, 'Dolar' -> 'U$S 150.000'
 */
export function formatearPrecio(valor, moneda) {
    if (valor == null || valor === '' || isNaN(Number(valor)) || Number(valor) <= 0) {
        return 'Consultar valor';
    }

    const simbolo = (moneda === 'Peso' || moneda === '$') ? '$' : 'U$S';
    const numeroFormateado = Math.round(Number(valor)).toLocaleString('es-AR');

    return `${simbolo} ${numeroFormateado}`;
}
