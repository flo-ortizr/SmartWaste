export function mostrarHorario(zona, horarios) {
  if (!zona || zona.trim() === "") {
    return "Por favor, seleccione una zona para consultar los horarios";
  }

  const filtrados = horarios.filter(h => h.zona.includes(zona));

  if (filtrados.length === 0) {
    return "No existen horarios de recolección registrados para esta zona";
  }

  const h = filtrados[0];
  return `Zona ${h.zona}: ${h.dias} de ${h.horas}`;
}