import { mostrarRutas } from "./rutas.js";
describe("Gestor de Rutas", () => {

  it("debería mostrar un mensaje cuando no hay rutas registradas", () => {
    let rutasVacias = []; 
    let resultado = mostrarRutas(rutasVacias); 
    expect(resultado).toEqual("No existen rutas registradas"); 
  });

});