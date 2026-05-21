export const UMBRAL_CRITICO = 3;

export class ZonaService {
  constructor(listaReportes, umbral = UMBRAL_CRITICO) {
    this.listaReportes = listaReportes || [];
    this.umbral = umbral;
  }

  contarPendientesPorZona() {
    return this.listaReportes.reduce((acumulador, reporte) => {
      if (reporte.estado === "Pendiente") {
        const zona = reporte.zona;
        acumulador[zona] = (acumulador[zona] || 0) + 1;
      }
      return acumulador;
    }, {});
  }

  esZonaCritica(zona) {
    if (!zona) return false;
    const conteo = this.contarPendientesPorZona();
    return (conteo[zona] || 0) >= this.umbral;
  }

  obtenerZonasConConteo() {
    if (this.listaReportes.length === 0) return [];
    const conteo = this.contarPendientesPorZona();
    return Object.entries(conteo).map(([zona, cantidad]) => ({
      zona,
      cantidad,
      critica: cantidad >= this.umbral
    }));
  }

  ordenarZonas(zonasConConteo, orden = "descendente") {
    if (!zonasConConteo || zonasConConteo.length === 0) return [];
    const copia = [...zonasConConteo];
    return orden === "ascendente"
      ? copia.sort((a, b) => a.cantidad - b.cantidad)
      : copia.sort((a, b) => b.cantidad - a.cantidad);
  }

  filtrarReportesPorZona(zona) {
    if (!zona) return [];
    return this.listaReportes.filter(r => r.zona === zona);
  }
}

// Funciones de compatibilidad para los tests existentes
export function contarReportesPendientesPorZona(listaReportes) {
  if (!listaReportes || listaReportes.length === 0) return {};
  return new ZonaService(listaReportes).contarPendientesPorZona();
}

export function esZonaCritica(zona, listaReportes, umbral = UMBRAL_CRITICO) {
  if (!zona || !listaReportes) return false;
  return new ZonaService(listaReportes, umbral).esZonaCritica(zona);
}

export function obtenerZonasConConteo(listaReportes) {
  if (!listaReportes || listaReportes.length === 0) return [];
  return new ZonaService(listaReportes).obtenerZonasConConteo();
}

export function ordenarZonasPorReportes(zonasConConteo, orden = "descendente") {
  if (!zonasConConteo || zonasConConteo.length === 0) return [];
  return new ZonaService([]).ordenarZonas(zonasConConteo, orden);
}

export function filtrarReportesPorZona(zona, listaReportes) {
  if (!zona || !listaReportes) return [];
  return new ZonaService(listaReportes).filtrarReportesPorZona(zona);
}
