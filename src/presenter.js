import CrearReporte from "./gestionadorbasura.js";

const form = document.querySelector("#sumar-form");
const div = document.querySelector("#resultado-div");
const inputMensaje = document.querySelector("#mensaje_reporte");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const mensaje = inputMensaje.value;

  div.innerHTML = CrearReporte(mensaje);
});