import { registrarUsuario } from "./usuarios.js";

describe("Registro de Usuarios - Datos Válidos", () => {
  it("debería registrar un usuario correctamente con datos válidos", () => {
    let usuariosBD = [];
    let resultado = registrarUsuario("samuel", "password123", usuariosBD);
    expect(resultado).toEqual("Usuario registrado correctamente");
    expect(usuariosBD.length).toBe(1);
    expect(usuariosBD[0].username).toEqual("samuel");
  });
});