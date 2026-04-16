import CrearReporte from "./gestionadorbasura.js";

const formReporte = document.querySelector("#reporte-form");
const div = document.querySelector("#resultado-div");
const inputMensaje = document.querySelector("#mensaje_reporte");


if (formReporte) 
{
  formReporte.addEventListener("submit", (event) => {
    event.preventDefault();
    const mensaje = inputMensaje.value;
    div.innerHTML = CrearReporte(mensaje);
  });

}