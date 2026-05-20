export function esCampoValido(campo) {
  return campo && campo.trim() !== "";
}

export function mostrarRutas(rutas) {
  if (!rutas) {
    return "No fue posible mostrar las rutas";
  }

  if (rutas.length === 0) {
    return "No existen rutas registradas";
  }

  let html = "<ul>";

  for (let i = 0; i < rutas.length; i++) {
    html += `<li>Zona: ${rutas[i].zona} - Días: ${rutas[i].dias}</li>`;
  }

  html += "</ul>";

  return html;
}

export function crearRuta(nombreRuta, zona, dias, cobertura) {
  if (
    !esCampoValido(nombreRuta) ||
    !esCampoValido(zona) ||
    !esCampoValido(dias) ||
    !esCampoValido(cobertura)
  ) {
    throw new Error("Por favor, complete los campos requeridos");

    return {
    nombreRuta: nombreRuta.trim(),
    zona: zona.trim(),
    dias: dias.trim(),
    cobertura: cobertura.trim()
  };
  }

  return {
    nombreRuta: nombreRuta.trim(),
    zona: zona.trim(),
    dias: dias.trim(),
    cobertura: cobertura.trim()
  };
}

export function buscarRutaPorZona(zonaABuscar, listaDeRutas) {
  if (!esCampoValido(zonaABuscar)) {
    return "Por favor, ingrese una zona para buscar.";
  }

  let rutaEncontrada = listaDeRutas.find(
    ruta => ruta.zona === zonaABuscar
  );

  if (!rutaEncontrada) {
    return "No se encontraron rutas para esa zona.";
  }

  return `Zona: ${rutaEncontrada.zona} - Días: ${rutaEncontrada.dias}`;
}

export function eliminarRuta(zona, listaDeRutas, confirmacion) {
  if (!esCampoValido(zona)) {
    return "Por favor, seleccione una ruta para eliminar.";
  }

  const index = listaDeRutas.findIndex(r => r.zona === zona);

  if (index === -1) {
    return "No se encontró la ruta a eliminar.";
  }

  if (!confirmacion) {
    return "¿Está seguro de eliminar esta ruta?";
  }

  listaDeRutas.splice(index, 1);

  return "Ruta eliminada correctamente";
}