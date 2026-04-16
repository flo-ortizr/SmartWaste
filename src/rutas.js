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
    !nombreRuta || nombreRuta.trim() === "" ||
    !zona || zona.trim() === "" ||
    !dias || dias.trim() === "" ||
    !cobertura || cobertura.trim() === ""
  ) {
    return "Por favor, complete los campos requeridos";
  }

  return "Ruta registrada correctamente";
}
