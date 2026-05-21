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

  it("debería mostrar un mensaje de error si la contraseña tiene menos de 8 caracteres", () => {
    let usuariosBD = [];
    let resultado = registrarUsuario("samuel", "12345", usuariosBD);
    expect(resultado).toEqual("La contraseña debe tener al menos 8 caracteres");
  });
});

describe("Inicio de Sesión", () => {
  it("debería autenticar correctamente con credenciales válidas", () => {
    let usuariosBD = [{ username: "samuel", password: "password123" }];
    let resultado = iniciarSesion("samuel", "password123", usuariosBD);
    expect(resultado).toEqual("Inicio de sesión exitoso");
  });

  it("debería mostrar un mensaje de error si los campos están vacíos", () => {
    let usuariosBD = [{ username: "samuel", password: "password123" }];
    let resultado = iniciarSesion("", "password123", usuariosBD);
    expect(resultado).toEqual("Por favor, complete los campos requeridos");
  });
});