import { registrarUsuario, iniciarSesion } from "./usuarios.js";

describe("Registro de Usuarios", () => {
  it("deberia registrar un usuario correctamente con datos validos", () => {
    let usuariosBD = [];
    let resultado = registrarUsuario("samuel", "password123", usuariosBD);
    expect(resultado).toEqual("Usuario registrado correctamente");
    expect(usuariosBD.length).toBe(1);
    expect(usuariosBD[0].username).toEqual("samuel");
  });

  it("debería asignar rol ciudadano al registrar", () => {
    let usuariosBD = [];
    registrarUsuario("ana", "password123", usuariosBD);
    expect(usuariosBD[0].rol).toEqual("ciudadano");
  });

  it("deberia mostrar un mensaje de error si los campos están vacios", () => {
    let usuariosBD = [];
    let resultado = registrarUsuario("", "", usuariosBD);
    expect(resultado).toEqual("Por favor, complete los campos requeridos");
  });

  it("debería mostrar un mensaje de error si el usuario ya existe", () => {
    let usuariosBD = [{ username: "samuel", password: "oldpassword", rol: "ciudadano" }];
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
    let usuariosBD = [{ username: "samuel", password: "password123", rol: "ciudadano" }];
    let resultado = iniciarSesion("samuel", "password123", usuariosBD);
    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toEqual("Inicio de sesión exitoso");
  });

  it("debería devolver el rol del usuario al autenticar", () => {
    let usuariosBD = [{ username: "emsa1", password: "emsa1234", rol: "emsa" }];
    let resultado = iniciarSesion("emsa1", "emsa1234", usuariosBD);
    expect(resultado.rol).toEqual("emsa");
  });

  it("debería retornar rol ciudadano para usuario ciudadano", () => {
    let usuariosBD = [{ username: "ana", password: "password123", rol: "ciudadano" }];
    let resultado = iniciarSesion("ana", "password123", usuariosBD);
    expect(resultado.rol).toEqual("ciudadano");
  });

  it("debería mostrar un mensaje de error si los campos están vacíos", () => {
    let usuariosBD = [{ username: "samuel", password: "password123", rol: "ciudadano" }];
    let resultado = iniciarSesion("", "password123", usuariosBD);
    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toEqual("Por favor, complete los campos requeridos");
  });

  it("debería mostrar un mensaje de error si el usuario no existe", () => {
    let usuariosBD = [{ username: "samuel", password: "password123", rol: "ciudadano" }];
    let resultado = iniciarSesion("carlos", "password123", usuariosBD);
    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toEqual("Usuario o contraseña incorrectos");
  });

  it("debería mostrar un mensaje de error si la contraseña es incorrecta", () => {
    let usuariosBD = [{ username: "samuel", password: "password123", rol: "ciudadano" }];
    let resultado = iniciarSesion("samuel", "wrongpassword", usuariosBD);
    expect(resultado.exito).toBe(false);
  });
});
