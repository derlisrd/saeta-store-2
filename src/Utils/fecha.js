export function formatFecha(fechaStr) {
  if (!fechaStr || typeof fechaStr !== 'string') return '';
  
  // Limpia posibles espacios invisibles (como NBSP) antes de procesar
  const limpia = fechaStr.trim().replace(/\u00A0/g, '');
  
  const partes = limpia.split('-');
  if (partes.length !== 3) return fechaStr; // Devuelve original si el formato no es válido

  return partes.reverse().join('-');
}

// Ejemplo de uso: console.log(formatFecha('2026-10-01')); // "01-10-2026"