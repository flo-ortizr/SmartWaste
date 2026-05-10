import { mostrarRutas, crearRuta, eliminarRuta } from "./rutas.js";
import { obtenerResumenReportes, obtenerDetalleReporte } from "./reportes.js";

//  DOM 
const btnVerRutas = document.querySelector("#btn-ver-rutas");
const divListaRutas = document.querySelector("#lista-rutas-div");
const formRuta = document.querySelector("#ruta-form");
const divRuta = document.querySelector("#resultado-ruta-div");
const inputNombreRuta = document.querySelector("#nombre_ruta");
const inputZonaRuta = document.querySelector("#zona_ruta");
const inputDiasRuta = document.querySelector("#dias_ruta");
const inputCoberturaRuta = document.querySelector("#cobertura_ruta");
const btnVerReportes = document.querySelector("#btn-ver-reportes");
const divListaReportes = document.querySelector("#lista-reportes-div");
const divDetalleReporte = document.querySelector("#detalle-reporte-div");
const btnEliminarRuta = document.querySelector("#btn-eliminar-ruta");
const inputZonaEliminar = document.querySelector("#zona_eliminar");
const divResultadoEliminar = document.querySelector("#resultado-eliminar-div");

const reportesBD = [
  { id: "1", zona: "Cala Cala", fecha: "2026-04-18", estado: "Pendiente", mensaje: "Basura en la esquina", usuario: "Juan" },
  { id: "2", zona: "Muyurina", fecha: "2026-04-19", estado: "Atendido", mensaje: "Contenedor lleno", usuario: "Ana" }
];

const rutasBD = [
  { nombreRuta: "Ruta 1", zona: "Zona Norte - Cala Cala", dias: "Lunes, Miércoles y Viernes", cobertura: "Cala Cala" },
  { nombreRuta: "Ruta 2", zona: "Zona Sur - La Chimba", dias: "Martes, Jueves y Sábados", cobertura: "La Chimba" }
];

//  VALIDACIONES
function validarFormRuta(nombre, zona, dias, cobertura) {
  if (!nombre || nombre.trim() === "") return "Por favor, ingrese un nombre de ruta";
  if (!zona || zona.trim() === "") return "Por favor, ingrese una zona";
  if (!dias || dias.trim() === "") return "Por favor, ingrese los días";
  if (!cobertura || cobertura.trim() === "") return "Por favor, ingrese la cobertura";
  return null;
}

//  RENDERIZADO 
function mostrarError(div, mensaje) {
  div.innerHTML = `<span style='color:red'>${mensaje}</span>`;
}

function mostrarExito(div, mensaje) {
  div.innerHTML = `<span style='color:green'>${mensaje}</span>`;
}

function renderizarListaReportes(reportes) {
  if (reportes.length === 0) return "<p>No existen reportes registrados</p>";
  let html = "<ul>";
  reportes.forEach((reporte) => {
    html += `<li>
      Zona: ${reporte.zona} | Fecha: ${reporte.fecha} | Estado: ${reporte.estado}
      <button class="btn-detalle" data-id="${reporte.id}">Ver Detalle</button>
    </li>`;
  });
  html += "</ul>";
  return html;
}

function renderizarDetalleReporte(detalle) {
  return `
    <hr>
    <h3>Detalle del Reporte</h3>
    <p><strong>ID:</strong> ${detalle.id}</p>
    <p><strong>Zona:</strong> ${detalle.zona}</p>
    <p><strong>Fecha:</strong> ${detalle.fecha}</p>
    <p><strong>Estado:</strong> ${detalle.estado}</p>
    <p><strong>Usuario:</strong> ${detalle.usuario}</p>
    <p><strong>Descripción:</strong> ${detalle.mensaje}</p>
  `;
}

//  EVENTOS 
if (btnVerRutas) {
  btnVerRutas.addEventListener("click", () => {
    divListaRutas.innerHTML = mostrarRutas(rutasBD);
  });
}

if (formRuta) {
  formRuta.addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = inputNombreRuta.value;
    const zona = inputZonaRuta.value;
    const dias = inputDiasRuta.value;
    const cobertura = inputCoberturaRuta.value;

    const error = validarFormRuta(nombre, zona, dias, cobertura);
    if (error) {
      mostrarError(divRuta, error);
      return;
    }

    const resultado = crearRuta(nombre, zona, dias, cobertura);
    if (typeof resultado === "string") {
      mostrarError(divRuta, resultado);
    } else {
      rutasBD.push(resultado);
      mostrarExito(divRuta, "Ruta registrada correctamente");
      formRuta.reset();
      divListaRutas.innerHTML = mostrarRutas(rutasBD);
    }
  });
}

if (btnVerReportes) {
  btnVerReportes.addEventListener("click", () => {
    const resumen = obtenerResumenReportes(reportesBD);
    divListaReportes.innerHTML = renderizarListaReportes(resumen);
    if (divDetalleReporte) divDetalleReporte.innerHTML = "";
  });
}

if (divListaReportes) {
  divListaReportes.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-detalle")) {
      const id = event.target.getAttribute("data-id");
      const detalle = obtenerDetalleReporte(id, reportesBD);
      if (detalle && divDetalleReporte) {
        divDetalleReporte.innerHTML = renderizarDetalleReporte(detalle);
      }
    }
  });
}

if (btnEliminarRuta) {
  btnEliminarRuta.addEventListener("click", () => {
    const zona = inputZonaEliminar.value;
    const confirmacion = confirm("¿Está seguro de eliminar esta ruta?");
    const resultado = eliminarRuta(zona, rutasBD, confirmacion);
    divResultadoEliminar.innerHTML = resultado;
    if (resultado === "Ruta eliminada correctamente") {
      divListaRutas.innerHTML = mostrarRutas(rutasBD);
    }
  });
}