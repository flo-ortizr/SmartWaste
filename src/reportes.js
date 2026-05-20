import { zonasCochabamba } from "./data/data.js";

function CrearReporte({ zona, mensaje, fecha }) {

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

export default CrearReporte;