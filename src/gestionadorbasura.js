function CrearReporte(mensaje) {
  if (mensaje === null || mensaje.trim() === "") {
    return "Advertencia: vacío";
  } else {
    return "Reporte guardado";
  }
}

export default CrearReporte;