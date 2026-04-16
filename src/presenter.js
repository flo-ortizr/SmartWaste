import CrearReporte from "./gestionadorbasura.js";
import { mostrarRutas } from "./rutas.js";

const formReporte = document.querySelector("#reporte-form");
const div = document.querySelector("#resultado-div");
const inputMensaje = document.querySelector("#mensaje_reporte");

const btnVerRutas = document.querySelector("#btn-ver-rutas");
const divListaRutas = document.querySelector("#lista-rutas-div");

if (formReporte) 
{
  formReporte.addEventListener("submit", (event) => {
    event.preventDefault();
    const mensaje = inputMensaje.value;
    div.innerHTML = CrearReporte(mensaje);
  });

if (btnVerRutas) {
  btnVerRutas.addEventListener("click", () => {
    const rutasSimuladas = [
      { zona: "Zona Norte - Cala Cala", dias: "Lunes, Miércoles y Viernes" },
      { zona: "Zona Sur - La Chimba", dias: "Martes, Jueves y Sábados" }
    ];
    divListaRutas.innerHTML = mostrarRutas(rutasSimuladas);
  });
}

}