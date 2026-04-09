import CrearReporte from "./gestionadorbasura.js";

describe("CrearReporte", () => {
  it("deberia mostrar el mensaje de descripcion del reporte", () => {
    expect(CrearReporte("")).toEqual("Advertencia: vacío");
  });

  it("deberia mostrar el mensaje de descripcion del reporte", () => {
    expect(CrearReporte("Basura en la Recoleta")).toEqual("Reporte guardado");
  });
});

