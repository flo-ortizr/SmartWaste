import CrearReporte from "./gestionadorbasura.js";
import { mostrarRutas } from "./rutas.js";
import crearRuta from "./crearRuta.js";

const formReporte = document.querySelector("#sumar-form");
const divReporte = document.querySelector("#resultado-div");
const inputMensaje = document.querySelector("#mensaje_reporte");

const btnVerRutas = document.querySelector("#btn-ver-rutas");
const divListaRutas = document.querySelector("#lista-rutas-div");

const formRuta = document.querySelector("#ruta-form");
const divRuta = document.querySelector("#resultado-ruta-div");
const inputNombreRuta = document.querySelector("#nombre_ruta");
const inputZonaRuta = document.querySelector("#zona_ruta");

if (formReporte) {
  formReporte.addEventListener("submit", (event) => {
    event.preventDefault();
    const mensaje = inputMensaje.value;
    divReporte.innerHTML = CrearReporte(mensaje);
  });
}

if (btnVerRutas) {
  btnVerRutas.addEventListener("click", () => {
    const rutasSimuladas = [
      { zona: "Zona Norte - Cala Cala", dias: "Lunes, Miércoles y Viernes" },
      { zona: "Zona Sur - La Chimba", dias: "Martes, Jueves y Sábados" }
    ];
    divListaRutas.innerHTML = mostrarRutas(rutasSimuladas);
  });
}

if (formRuta) {
  formRuta.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreRuta = inputNombreRuta.value;
    const zonaRuta = inputZonaRuta.value;

    divRuta.innerHTML = crearRuta(nombreRuta, zonaRuta);
  });
}