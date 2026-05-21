import { iniciarSesion, registrarUsuario } from "./usuarios.js";


const usuariosEMSA = [
  { username: "emsa1",  password: "emsa1234",  rol: "emsa" },
  { username: "emsa2",  password: "emsa5678",  rol: "emsa" }
];


function obtenerCiudadanos() {
  try {
    return JSON.parse(localStorage.getItem("smartwaste_usuarios") || "[]");
  } catch {
    return [];
  }
}

function guardarCiudadano(usuario) {
  const lista = obtenerCiudadanos();
  lista.push(usuario);
  localStorage.setItem("smartwaste_usuarios", JSON.stringify(lista));
}

function obtenerTodosLosUsuarios() {
  return [...usuariosEMSA, ...obtenerCiudadanos()];
}

const formLogin    = document.querySelector("#login-form");
const inputUser    = document.querySelector("#username_login");
const inputPass    = document.querySelector("#password_login");
const divLogin     = document.querySelector("#resultado-login-div");

const formRegistro = document.querySelector("#registro-form");
const inputRegUser = document.querySelector("#username_registro");
const inputRegPass = document.querySelector("#password_registro");
const divRegistro  = document.querySelector("#resultado-registro-div");

function mostrarError(div, msg) {
  div.textContent = msg;
  div.className = "msg msg-error";
}

function mostrarExito(div, msg) {
  div.textContent = msg;
  div.className = "msg msg-exito";
}


const params = new URLSearchParams(window.location.search);
if (params.get("logout") === "true") {
  mostrarExito(divLogin, "Sesión cerrada correctamente.");
}

if (formLogin) {
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const resultado = iniciarSesion(inputUser.value, inputPass.value, obtenerTodosLosUsuarios());

    if (!resultado.exito) {
      mostrarError(divLogin, resultado.mensaje);
      return;
    }

    localStorage.setItem("jwt_token", "token-simulado-12345");
    localStorage.setItem("smartwaste_rol", resultado.rol);

    if (resultado.rol === "emsa") {
      window.location.href = "./emsa.html";
    } else {
      window.location.href = "./ciudadano.html";
    }
  });
}


if (formRegistro) {
  formRegistro.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = inputRegUser.value;
    const password = inputRegPass.value;
    const todosLosUsuarios = obtenerTodosLosUsuarios();
    const resultado = registrarUsuario(username, password, todosLosUsuarios);

    if (resultado !== "Usuario registrado correctamente") {
      mostrarError(divRegistro, resultado);
      return;
    }

    guardarCiudadano({ username: username.trim(), password, rol: "ciudadano" });
    mostrarExito(divRegistro, `Usuario "${username}" registrado. Ya puedes iniciar sesión.`);
    formRegistro.reset();
  });
}
