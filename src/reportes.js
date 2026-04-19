function CrearReporte({ zona, mensaje, fecha }) {

  const zonasCochabamba = [
    "Cala Cala",
    "Las Cuadras",
    "Tupuraya",
    "Queru Queru",
    "Alalay",
    "Sarco",
    "Pacata",
    "Villa Busch",
    "Temporal",
    "Muyurina"
  ];

  if (mensaje === null || mensaje?.trim() === "") {
    return "Advertencia: vacío";
  }

  if (!zonasCochabamba.includes(zona)) {
    return "Error: zona inválida";
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
      zona: reporte.zona,
      fecha: reporte.fecha,
      estado: reporte.estado
    };
  });
}

export default CrearReporte;