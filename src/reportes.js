import { zonasCochabamba } from "./data/data.js";

export class ReporteService {
  constructor(listaReportes) {
    this.listaReportes = listaReportes || [];
  }

  obtenerResumen() {
    return this.listaReportes.map(reporte => ({
      id: reporte.id,
      zona: reporte.zona,
      fecha: reporte.fecha,
      estado: reporte.estado
    }));
  }

  obtenerDetalle(idBuscado) {
    if (!idBuscado) return null;
    return this.listaReportes.find(r => String(r.id) === String(idBuscado)) || null;
  }

  marcarAtendido(id, atendidoPor) {
    const reporte = this.obtenerDetalle(id);
    if (!reporte) return false;
    if (reporte.estado === "Atendido") return false;
    reporte.estado = "Atendido";
    reporte.atendidoPor = atendidoPor;
    reporte.fechaAtencion = new Date().toLocaleString();
    return true;
  }

  obtenerCercanos(ubicacionUsuario, radioMaximoKm = 1.5) {
    if (!ubicacionUsuario) return [];
    return this.listaReportes
      .map(reporte => ({
        ...reporte,
        distancia: ReporteService.calcularDistanciaKm(
          ubicacionUsuario.lat, ubicacionUsuario.lng,
          reporte.lat, reporte.lng
        )
      }))
      .filter(r => r.distancia <= radioMaximoKm)
      .map(r => ({
        id: r.id,
        zona: r.zona,
        fecha: r.fecha,
        estado: r.estado,
        distancia: parseFloat(r.distancia.toFixed(2))
      }));
  }

  static calcularDistanciaKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  static validarFoto(archivo) {
    if (!archivo) return "Por favor, seleccione una foto";
    const formatosValidos = ["image/jpeg", "image/jpg", "image/png"];
    if (!archivo.type || !formatosValidos.includes(archivo.type))
      return "El archivo seleccionado no es una imagen válida";
    if (archivo.size > 5 * 1024 * 1024)
      return "El tamaño del archivo excede el límite permitido";
    return "Foto válida";
  }

  static crearReporte({ zona, mensaje, fecha }) {
    if (mensaje === null || mensaje?.trim() === "")
      throw new Error("Advertencia: vacío");
    if (!zonasCochabamba.includes(zona))
      throw new Error("Error: zona inválida");
    return {
      zona,
      fecha: fecha || new Date().toISOString().split("T")[0],
      mensaje,
      estado: "guardado"
    };
  }
}

// Funciones de compatibilidad para los tests existentes
function crearReporte({ zona, mensaje, fecha }) {
  return ReporteService.crearReporte({ zona, mensaje, fecha });
}

export function validarFoto(archivo) {
  return ReporteService.validarFoto(archivo);
}

export function obtenerResumenReportes(listaReportes) {
  if (!listaReportes || listaReportes.length === 0) return [];
  return new ReporteService(listaReportes).obtenerResumen();
}

export function obtenerDetalleReporte(idBuscado, listaReportes) {
  if (!idBuscado || !listaReportes) return null;
  return new ReporteService(listaReportes).obtenerDetalle(idBuscado);
}

export function obtenerReportesCercanos(ubicacionUsuario, listaReportes, radioMaximoKm = 1.5) {
  if (!ubicacionUsuario || !listaReportes) return [];
  return new ReporteService(listaReportes).obtenerCercanos(ubicacionUsuario, radioMaximoKm);
}

export default crearReporte;
