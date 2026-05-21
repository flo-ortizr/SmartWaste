import { zonasCochabamba } from "./data/data.js";

function crearReporte({ zona, mensaje, fecha }) {

  if (mensaje === null || mensaje?.trim() === "") {
    throw new Error("Advertencia: vacío");
  }

  if (!zonasCochabamba.includes(zona)) {
    throw new Error("Error: zona inválida");
  }

  const fechaFinal = fecha || new Date().toISOString().split("T")[0];

  const reporte = {
    zona,
    fecha: fechaFinal,
    mensaje,
    estado: "guardado"
  };

  return reporte;

}

export function validarFoto(archivo) {
  if (!archivo) 
  {
    return "Por favor, seleccione una foto";
  }

  if (!archivo.type || !archivo.type.startsWith("image/")) {
    return "El archivo seleccionado no es una imagen válida";
  }

  return "Foto válida";
}

export function obtenerResumenReportes(listaReportes) {
  if (!listaReportes || listaReportes.length === 0) {
    return []; 
  }

  return listaReportes.map(reporte => {
    return {
      id: reporte.id,
      zona: reporte.zona,
      fecha: reporte.fecha,
      estado: reporte.estado
    };
  });
}

export function obtenerDetalleReporte(idBuscado, listaReportes) {
  if (!idBuscado || !listaReportes) return null;
  
  const reporteEncontrado = listaReportes.find(r => String(r.id) === String(idBuscado));
  return reporteEncontrado || null;
}

function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

export function obtenerReportesCercanos(ubicacionUsuario, listaReportes, radioMaximoKm = 1.5) {
  if (!ubicacionUsuario || !listaReportes) return [];

  return listaReportes
    .map(reporte => {
      const distancia = calcularDistanciaKm(
        ubicacionUsuario.lat, 
        ubicacionUsuario.lng, 
        reporte.lat, 
        reporte.lng
      );
      return { ...reporte, distancia };
    })
    .filter(reporte => reporte.distancia <= radioMaximoKm)
    .map(reporte => ({
      id: reporte.id,
      zona: reporte.zona,
      fecha: reporte.fecha,
      estado: reporte.estado,
      distancia: parseFloat(reporte.distancia.toFixed(2))
    }));
}

export default crearReporte;