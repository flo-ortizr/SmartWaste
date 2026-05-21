export const UMBRAL_CRITICO = 3;

export function contarReportesPendientesPorZona(listaReportes) {
  if (!listaReportes || listaReportes.length === 0) return {};

  return listaReportes.reduce((acumulador, reporte) => {
    if (reporte.estado === "Pendiente") {
      const zona = reporte.zona;
      acumulador[zona] = (acumulador[zona] || 0) + 1;
    }
    return acumulador;
  }, {});
}

export function esZonaCritica(zona, listaReportes, umbral = UMBRAL_CRITICO) {
  if (!zona || !listaReportes) return false;

  const conteo = contarReportesPendientesPorZona(listaReportes);
  return (conteo[zona] || 0) >= umbral;
}

export function obtenerZonasConConteo(listaReportes) {
  if (!listaReportes || listaReportes.length === 0) return [];

  const conteo = contarReportesPendientesPorZona(listaReportes);

  return Object.entries(conteo).map(([zona, cantidad]) => ({
    zona,
    cantidad,
    critica: cantidad >= UMBRAL_CRITICO
  }));
}

export function ordenarZonasPorReportes(zonasConConteo, orden = "descendente") {
  if (!zonasConConteo || zonasConConteo.length === 0) return [];

  const copia = [...zonasConConteo];

  if (orden === "ascendente") {
    return copia.sort((a, b) => a.cantidad - b.cantidad);
  }

  return copia.sort((a, b) => b.cantidad - a.cantidad);
}

export function filtrarReportesPorZona(zona, listaReportes) {
  if (!zona || !listaReportes) return [];
  return listaReportes.filter(r => r.zona === zona);
}
