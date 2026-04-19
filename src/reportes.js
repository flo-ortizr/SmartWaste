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
  }

export default CrearReporte;