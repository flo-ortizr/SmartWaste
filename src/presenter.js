import CrearReporte from "./gestionadorbasura.js";
import { mostrarRutas, crearRuta } from "./rutas.js";
import {mostrarHorario} from "./horarios.js";

const formReporte = document.querySelector("#sumar-form");
const divReporte = document.querySelector("#resultado-div");
const inputMensaje = document.querySelector("#mensaje_reporte");

const btnVerRutas = document.querySelector("#btn-ver-rutas");
const divListaRutas = document.querySelector("#lista-rutas-div");

const formRuta = document.querySelector("#ruta-form");
const divRuta = document.querySelector("#resultado-ruta-div");
const inputNombreRuta = document.querySelector("#nombre_ruta");
const inputZonaRuta = document.querySelector("#zona_ruta");
const inputDiasRuta = document.querySelector("#dias_ruta");
const inputCoberturaRuta = document.querySelector("#cobertura_ruta");

const inputZonaHorario = document.querySelector("#zona_horario");
const btnVerHorarios = document.querySelector("#btn-ver-horarios");
const divHorarios = document.querySelector("#resultado-horarios-div");

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
    const diasRuta = inputDiasRuta.value;
    const coberturaRuta = inputCoberturaRuta.value;

    divRuta.innerHTML = crearRuta(
      nombreRuta,
      zonaRuta,
      diasRuta,
      coberturaRuta
    );
  });


  if (btnVerHorarios) {
  btnVerHorarios.addEventListener("click", () => {

    const zona = inputZonaHorario.value;

    const horariosSimulados = [
      { zona: "Zona Norte - Cala Cala", dias: "Lunes a Viernes", horas: "8:00 - 10:00" },
      { zona: "Zona Sur - La Chimba", dias: "Martes a Sábado", horas: "14:00 - 16:00" }
    ];

    divHorarios.innerHTML = mostrarHorario(zona, horariosSimulados);
  });
}
}