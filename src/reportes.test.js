import crearReporte, { validarFoto, obtenerResumenReportes, obtenerDetalleReporte } from "./reportes.js";

describe("crearReporte", () => {

  test("debería lanzar advertencia si el mensaje está vacío", () => {
  expect(() => crearReporte({ mensaje: "" }))
    .toThrow("Advertencia: vacío");
});

  test("debería lanzar advertencia si el mensaje es null", () => {
    expect(() => crearReporte({ mensaje: null }))
    .toThrow("Advertencia: vacío");
  });

  test("debería crear reporte con datos válidos", () => {
    const resultado = crearReporte({
      zona: "Cala Cala",
      mensaje: "Basura acumulada",
    });

    expect(resultado.estado).toBe("guardado");
    expect(resultado.zona).toBe("Cala Cala");
    expect(resultado.mensaje).toBe("Basura acumulada");
    expect(resultado.fecha).toBeDefined();
  });

  test("debería usar fecha proporcionada si existe", () => {
    const resultado = crearReporte({
      zona: "Las Cuadras",
      mensaje: "Contenedor lleno",
      fecha: "2026-04-16"
    });

    expect(resultado.fecha).toBe("2026-04-16");
  });

  test("debería rechazar zona inválida lanzando un error", () => {
    expect(() => crearReporte({ zona: "Zona inventada", mensaje: "Algo pasa" }))
    .toThrow("Error: zona inválida");
  });

  test("debería mostrar error si no se selecciona ninguna foto", () => {
    const resultado = validarFoto(null);
    expect(resultado).toBe("Por favor, seleccione una foto");
  });

  test("debería mostrar error si el archivo no es una imagen válida", () => {
    const archivoFalso = { type: "text/plain" };
    const resultado = validarFoto(archivoFalso);
    expect(resultado).toBe("El archivo seleccionado no es una imagen válida");
  });

  test("debería aceptar una imagen válida", () => {
    const archivoImagen = { type: "image/png" };
    const resultado = validarFoto(archivoImagen);
    expect(resultado).toBe("Foto válida");
  });

});

describe("Obtener Reportes Resumidos", () => {
  test("debería devolver un arreglo vacío si no hay reportes", () => {
    const resultado = obtenerResumenReportes([]);
    expect(resultado).toEqual([]);
  });

  test("debería devolver solo id, zona, fecha y estado, omitiendo otros datos", () => {
    const reportesSimulados = [
      { id: "1", zona: "Cala Cala", fecha: "2026-04-19", estado: "Pendiente", mensaje: "Mucha basura", usuario: "Juan" }
    ];
    
    const resultado = obtenerResumenReportes(reportesSimulados);
    
    expect(resultado[0]).toEqual({
      id: "1",
      zona: "Cala Cala",
      fecha: "2026-04-19",
      estado: "Pendiente"
    });
    
    expect(resultado[0].mensaje).toBeUndefined();
    expect(resultado[0].usuario).toBeUndefined();
  });
});

describe("Obtener Detalle de Reporte", () => {
  test("debería devolver null si el id no existe", () => {
    const reportes = [{ id: "1", zona: "Norte", mensaje: "Basura" }];
    expect(obtenerDetalleReporte("2", reportes)).toBeNull();
  });

 test("debería devolver el reporte completo con todos sus datos", () => {
  const reportes = [{
    id: "1",
    zona: "Norte",
    mensaje: "Basura",
    fecha: "2026-04-20",
    estado: "Pendiente",
    cantidadBasura: "Alta"
  }];

  expect(obtenerDetalleReporte("1", reportes)).toEqual({
    id: "1",
    zona: "Norte",
    mensaje: "Basura",
    fecha: "2026-04-20",
    estado: "Pendiente",
    cantidadBasura: "Alta"
  });
  });
});