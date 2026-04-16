export function mostrarRutas(rutas) {
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