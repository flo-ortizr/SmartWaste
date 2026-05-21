export class RutaService {
  constructor(listaRutas) {
    this.listaRutas = listaRutas || [];
  }

  mostrar() {
    if (this.listaRutas.length === 0) return "No existen rutas registradas";
    return this.listaRutas;
  }

  crear(nombreRuta, zona, dias, cobertura) {
    if (!esCampoValido(nombreRuta) || !esCampoValido(zona) ||
        !esCampoValido(dias) || !esCampoValido(cobertura)) {
      throw new Error("Por favor, complete los campos requeridos");
    }
    const nueva = {
      nombreRuta: nombreRuta.trim(),
      zona: zona.trim(),
      dias: dias.trim(),
      cobertura: cobertura.trim()
    };
    this.listaRutas.push(nueva);
    return nueva;
  }

  buscarPorZona(zonaABuscar) {
    if (!esCampoValido(zonaABuscar)) return "Por favor, ingrese una zona para buscar.";
    const encontrada = this.listaRutas.find(r => r.zona === zonaABuscar);
    if (!encontrada) return "No se encontraron rutas para esa zona.";
    return `Zona: ${encontrada.zona} - Días: ${encontrada.dias}`;
  }

  eliminar(zona, confirmacion) {
    if (!esCampoValido(zona)) return "Por favor, seleccione una ruta para eliminar.";
    const index = this.listaRutas.findIndex(r => r.zona === zona);
    if (index === -1) return "No se encontró la ruta a eliminar.";
    if (!confirmacion) return "¿Está seguro de eliminar esta ruta?";
    this.listaRutas.splice(index, 1);
    return "Ruta eliminada correctamente";
  }
}

export function esCampoValido(campo) {
  return campo && campo.trim() !== "";
}

export function mostrarRutas(rutas) {
  if (!rutas) return "No fue posible mostrar las rutas";
  if (rutas.length === 0) return "No existen rutas registradas";
  return rutas;
}

export function crearRuta(nombreRuta, zona, dias, cobertura) {
  if (!esCampoValido(nombreRuta) || !esCampoValido(zona) ||
      !esCampoValido(dias) || !esCampoValido(cobertura)) {
    throw new Error("Por favor, complete los campos requeridos");
  }
  return {
    nombreRuta: nombreRuta.trim(),
    zona: zona.trim(),
    dias: dias.trim(),
    cobertura: cobertura.trim()
  };
}

export function buscarRutaPorZona(zonaABuscar, listaDeRutas) {
  if (!esCampoValido(zonaABuscar)) return "Por favor, ingrese una zona para buscar.";
  const rutaEncontrada = listaDeRutas.find(r => r.zona === zonaABuscar);
  if (!rutaEncontrada) return "No se encontraron rutas para esa zona.";
  return `Zona: ${rutaEncontrada.zona} - Días: ${rutaEncontrada.dias}`;
}

export function eliminarRuta(zona, listaDeRutas, confirmacion) {
  if (!esCampoValido(zona)) return "Por favor, seleccione una ruta para eliminar.";
  const index = listaDeRutas.findIndex(r => r.zona === zona);
  if (index === -1) return "No se encontró la ruta a eliminar.";
  if (!confirmacion) return "¿Está seguro de eliminar esta ruta?";
  listaDeRutas.splice(index, 1);
  return "Ruta eliminada correctamente";
}
