import { mostrarRutas } from "./rutas.js";
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

});