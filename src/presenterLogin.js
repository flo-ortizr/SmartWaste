import { iniciarSesion } from "./usuarios.js";

const formLogin = document.querySelector("#login-form");
const inputUsernameLogin = document.querySelector("#username_login");
const inputPasswordLogin = document.querySelector("#password_login");
const divResultadoLogin = document.querySelector("#resultado-login-div");

const usuariosBD = [
  { username: "samuel", password: "password123" }
];

function mostrarError(div, mensaje) {
  div.textContent = mensaje;
  div.className = "mensaje-error";
}

function mostrarExito(div, mensaje) {
  div.textContent = mensaje;
  div.className = "mensaje-exito";
}

const parametrosURL = new URLSearchParams(window.location.search);
if (parametrosURL.get("logout") === "true") {
  mostrarExito(divResultadoLogin, "Sesión cerrada correctamente");
}

if (formLogin) {
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = inputUsernameLogin.value;
    const password = inputPasswordLogin.value;

    const resultado = iniciarSesion(username, password, usuariosBD);

    if (resultado === "Inicio de sesión exitoso") {
      localStorage.setItem("jwt_token", "token-simulado-emsa-12345");
      window.location.href = "./ciudadano.html";
    } else {
      mostrarError(divResultadoLogin, resultado);
    }
  });
}