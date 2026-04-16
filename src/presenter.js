import CrearReporte from "./gestionadorbasura.js";
import crearRuta from "./crearRuta.js";

const formReporte = document.querySelector("#sumar-form");
const divReporte = document.querySelector("#resultado-div");
const inputMensaje = document.querySelector("#mensaje_reporte");

if (formReporte) {
  formReporte.addEventListener("submit", (event) => {
    event.preventDefault();

    const mensaje = inputMensaje.value;

    divReporte.innerHTML = CrearReporte(mensaje);
  });
}

const formRuta = document.querySelector("#ruta-form");
const divRuta = document.querySelector("#resultado-ruta-div");
const inputNombreRuta = document.querySelector("#nombre_ruta");
const inputZonaRuta = document.querySelector("#zona_ruta");

if (formRuta) {
  formRuta.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreRuta = inputNombreRuta.value;
    const zonaRuta = inputZonaRuta.value;

    divRuta.innerHTML = crearRuta(nombreRuta, zonaRuta);
  });
}