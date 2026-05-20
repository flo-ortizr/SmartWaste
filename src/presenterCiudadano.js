import crearReporte, { validarFoto } from "./reportes.js";
import { buscarRutaPorZona } from "./rutas.js";
import { mostrarHorario } from "./horarios.js";

// DOM 
const formReporte = document.querySelector("#reporte-form");
const divReporte = document.querySelector("#resultado-div");
const inputMensaje = document.querySelector("#mensaje_reporte");
const inputZonaReporte = document.querySelector("#zona_reporte");
const inputFechaReporte = document.querySelector("#fecha_reporte");
const inputFotoReporte = document.querySelector("#foto_reporte");
const divVistaPreviaFoto = document.querySelector("#vista-previa-foto-div");
const btnVerHorarios = document.querySelector("#btn-ver-horarios");
const inputZonaHorario = document.querySelector("#zona_horario");
const divHorarios = document.querySelector("#resultado-horarios-div");
const btnBuscarRuta = document.querySelector("#btn-buscar-ruta");
const inputBuscarZona = document.querySelector("#buscar_zona_ruta");
const divResultadoBusquedaRuta = document.querySelector("#resultado-busqueda-ruta-div");

const rutasBD = [
  { nombreRuta: "Ruta 1", zona: "Zona Norte - Cala Cala", dias: "Lunes, Miércoles y Viernes", cobertura: "Cala Cala" },
  { nombreRuta: "Ruta 2", zona: "Zona Sur - La Chimba", dias: "Martes, Jueves y Sábados", cobertura: "La Chimba" }
];

// VALIDACIONES
function validarFormReporte(zona, mensaje, fecha, archivoFoto) {
  if (!zona) return "Por favor, seleccione una zona";
  if (!mensaje || mensaje.trim() === "") return "Por favor, ingrese una descripción del reporte";
  if (!fecha) return "Por favor, seleccione una fecha";
  const resultadoFoto = validarFoto(archivoFoto);
  if (resultadoFoto !== "Foto válida") return resultadoFoto;
  return null;
}

// RENDERIZADO 
function mostrarError(div, mensaje) {
  div.textContent = mensaje;
  div.className = "mensaje-error";
}

function mostrarExito(div, mensaje) {
  div.textContent = mensaje;
  div.className = "mensaje-exito";
}

function mostrarVistaPreviaFoto(archivo) {
  const url = URL.createObjectURL(archivo);
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Vista previa";
  img.className = "img-vista-previa";
  
  divVistaPreviaFoto.innerHTML = "";
  divVistaPreviaFoto.appendChild(img);
}

// EVENTOS
if (formReporte) {
  formReporte.addEventListener("submit", (event) => {
    event.preventDefault();
    const zona = inputZonaReporte.value;
    const fecha = inputFechaReporte.value;
    const mensaje = inputMensaje.value;
    const archivoFoto = inputFotoReporte.files[0];

    const error = validarFormReporte(zona, mensaje, fecha, archivoFoto);
    if (error) {
      mostrarError(divReporte, error);
      return;
    }

    try {
      const nuevoReporte = crearReporte({ zona, mensaje, fecha });
      
      mostrarVistaPreviaFoto(archivoFoto);
      mostrarExito(divReporte, "Reporte enviado correctamente");
      formReporte.reset();
      
    } catch (error) {
      mostrarError(divReporte, error.message);
    }
  });
}

if (btnVerHorarios) {
  btnVerHorarios.addEventListener("click", () => {
    const horariosSimulados = [
      { zona: "Zona Norte - Cala Cala", dias: "Lunes a Viernes", horas: "8:00 - 10:00" },
      { zona: "Zona Sur - La Chimba", dias: "Martes a Sábado", horas: "14:00 - 16:00" }
    ];
    divHorarios.textContent = mostrarHorario(inputZonaHorario.value, horariosSimulados);
  });
}

if (btnBuscarRuta) {
  btnBuscarRuta.addEventListener("click", () => {
    divResultadoBusquedaRuta.textContent = buscarRutaPorZona(inputBuscarZona.value, rutasBD);
  });
}