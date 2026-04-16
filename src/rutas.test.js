import { mostrarRutas, crearRuta, buscarRutaPorZona } from "./rutas.js";

describe("Gestor de Rutas", () => {
  it("debería mostrar un mensaje cuando no hay rutas registradas", () => {
    let rutasVacias = [];
    let resultado = mostrarRutas(rutasVacias);
    expect(resultado).toEqual("No existen rutas registradas");
  });

  it("debería mostrar la zona y los días cuando existen rutas registradas", () => {
    let rutasSimuladas = [
      { zona: "Norte", dias: "Lunes y Miércoles" }
    ];
    let resultado = mostrarRutas(rutasSimuladas);
    expect(resultado).toContain("Norte");
    expect(resultado).toContain("Lunes y Miércoles");
  });

  it("debería mostrar un mensaje de error si los datos son nulos o no cargan", () => {
    let datosMalos = null;
    let resultado = mostrarRutas(datosMalos);
    expect(resultado).toEqual("No fue posible mostrar las rutas");
  });

  it("debería mostrar mensaje si el nombre de la ruta está vacío", () => {
    let resultado = crearRuta("", "Zona Norte", "Lunes", "Cala Cala");
    expect(resultado).toEqual("Por favor, complete los campos requeridos");
  });

  it("debería mostrar mensaje si la zona está vacía", () => {
    let resultado = crearRuta("Ruta 1", "", "Lunes", "Cala Cala");
    expect(resultado).toEqual("Por favor, complete los campos requeridos");
  });

  it("debería mostrar mensaje si los días están vacíos", () => {
    let resultado = crearRuta("Ruta 1", "Zona Norte", "", "Cala Cala");
    expect(resultado).toEqual("Por favor, complete los campos requeridos");
  });

  it("debería mostrar mensaje si la cobertura está vacía", () => {
    let resultado = crearRuta("Ruta 1", "Zona Norte", "Lunes", "");
    expect(resultado).toEqual("Por favor, complete los campos requeridos");
  });

  it("debería registrar la ruta cuando los datos son correctos", () => {
    let resultado = crearRuta("Ruta 1", "Zona Norte", "Lunes", "Cala Cala");
    expect(resultado).toEqual("Ruta registrada correctamente");
  }); 
});

describe("Buscador de Rutas por Zona", () => {
  
  it("debería pedir que se ingrese una zona si el campo está vacío", () => {
    let zonaVacia = "";
    let rutasSimuladas = [{ zona: "Norte", dias: "Lunes" }];
    let resultado = buscarRutaPorZona(zonaVacia, rutasSimuladas);
    expect(resultado).toEqual("Por favor, ingrese una zona para buscar.");
  });

  it("debería mostrar un mensaje si la zona buscada no existe en las rutas", () => {
    let zonaBuscada = "Oeste";
    let rutasSimuladas = [
      { zona: "Norte", dias: "Lunes" },
      { zona: "Sur", dias: "Martes" }
    ];
    let resultado = buscarRutaPorZona(zonaBuscada, rutasSimuladas);
    expect(resultado).toEqual("No se encontraron rutas para esa zona.");
  });

  it("debería mostrar la zona y los días si la búsqueda es exitosa", () => {
    let zonaBuscada = "Norte";
    let rutasSimuladas = [
      { zona: "Norte", dias: "Lunes y Miércoles" },
      { zona: "Sur", dias: "Martes y Jueves" }
    ];
    let resultado = buscarRutaPorZona(zonaBuscada, rutasSimuladas);
    expect(resultado).toContain("Zona: Norte");
    expect(resultado).toContain("Días: Lunes y Miércoles");
  });



});