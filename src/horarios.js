export function mostrarHorario(zona, horarios) {
  if (!zona || zona.trim() === "") {
    return "Por favor, ingrese una zona válida";
  }
  
  const filtrados = horarios.filter(h => h.zona === zona);

  if (filtrados.length === 0) {
    return "No existen horarios de recolección registrados para esta zona";
  }
}