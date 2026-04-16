import crearRuta from "./crearRuta.js";

describe("crearRuta", () => {
  it("deberia mostrar mensaje si el nombre de la ruta esta vacio", () => {
    expect(crearRuta("", "Zona Norte")).toEqual("Por favor, complete los campos requeridos");
  });

  it("deberia mostrar mensaje si la zona esta vacia", () => {
    expect(crearRuta("Ruta 1", "")).toEqual("Por favor, complete los campos requeridos");
  });

   it("deberia registrar la ruta cuando los datos son correctos", () => {
    expect(crearRuta("Ruta 1", "Zona Norte")).toEqual("Ruta registrada correctamente");
  });
});