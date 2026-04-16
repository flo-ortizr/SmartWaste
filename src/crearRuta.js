function crearRuta(nombreRuta, zona) {
  if (nombreRuta.trim() === "" || zona.trim() === "") {
    return "Por favor, complete los campos requeridos";
  }

  return "Ruta registrada correctamente";
}

export default crearRuta;