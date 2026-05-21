import { registrarUsuario } from "./usuarios.js";

describe("Registro de Usuarios", () => {
  it("deberia registrar un usuario correctamente con datos validos", () => {
    let usuariosBD = [];
    let resultado = registrarUsuario("samuel", "password123", usuariosBD);
    expect(resultado).toEqual("Usuario registrado correctamente");
    expect(usuariosBD.length).toBe(1);
    expect(usuariosBD[0].username).toEqual("samuel");
  });

  it("deberia mostrar un mensaje de error si los campos están vacios", () => {
    let usuariosBD = [];
    let resultado = registrarUsuario("", "", usuariosBD);
    expect(resultado).toEqual("Por favor, complete los campos requeridos");
  });

  it("debería mostrar un mensaje de error si el usuario ya existe", () => {
    let usuariosBD = [{ username: "samuel", password: "oldpassword" }];
    let resultado = registrarUsuario("samuel", "newpassword123", usuariosBD);
    expect(resultado).toEqual("Este usuario ya se encuentra registrado");
  });
});