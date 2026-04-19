import CrearReporte, { validarFoto, obtenerResumenReportes } from "./reportes.js";
import { mostrarRutas, crearRuta, buscarRutaPorZona } from "./rutas.js";
import {mostrarHorario} from "./horarios.js";

const formReporte = document.querySelector("#reporte-form");
const divReporte = document.querySelector("#resultado-div");
const inputMensaje = document.querySelector("#mensaje_reporte");
const inputZonaReporte = document.querySelector("#zona_reporte");
const inputFechaReporte = document.querySelector("#fecha_reporte");

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

const inputBuscarZona = document.querySelector("#buscar_zona_ruta");
const btnBuscarRuta = document.querySelector("#btn-buscar-ruta");
const divResultadoBusquedaRuta = document.querySelector("#resultado-busqueda-ruta-div");

const inputFotoReporte = document.querySelector("#foto_reporte");
const divVistaPreviaFoto = document.querySelector("#vista-previa-foto-div");

const btnVerReportes = document.querySelector("#btn-ver-reportes");
const divListaReportes = document.querySelector("#lista-reportes-div");

if (formReporte) {
  formReporte.addEventListener("submit", (event) => {
    event.preventDefault();

    const zona = inputZonaReporte.value;
    const fecha = inputFechaReporte.value;
    const mensaje = inputMensaje.value;
    const archivoFoto = inputFotoReporte.files[0];

    if (!zona) {
      divReporte.innerHTML = "<span style='color:red'>Por favor, seleccione una zona</span>";
      return;
    }

    if (!mensaje || mensaje.trim() === "") {
      divReporte.innerHTML = "<span style='color:red'>Por favor, ingrese una descripción del reporte</span>";
      return;
    }

    if (!fecha) {
      divReporte.innerHTML = "<span style='color:red'>Por favor, seleccione una fecha</span>";
      return;
    }

     const resultadoFoto = validarFoto(archivoFoto);

    if (resultadoFoto !== "Foto válida") {
      divReporte.innerHTML = `<span style='color:red'>${resultadoFoto}</span>`;
      return;
    }

    const resultado = CrearReporte({ zona, mensaje, fecha });

    if (typeof resultado === "string") {
      divReporte.innerHTML = `<span style='color:red'>${resultado}</span>`;
    } else {
      const urlImagen = URL.createObjectURL(archivoFoto);
      divVistaPreviaFoto.innerHTML = `<img src="${urlImagen}" alt="Vista previa" width="200">`;
      divReporte.innerHTML = "<span style='color:green'>Reporte enviado correctamente</span>";
      formReporte.reset();
    }
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
}


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

if (btnBuscarRuta) {
  btnBuscarRuta.addEventListener("click", () => {
    const zonaBuscada = inputBuscarZona.value;
    const rutasSimuladas = [
      { zona: "Norte", dias: "Lunes y Miércoles" },
      { zona: "Sur", dias: "Martes y Jueves" }
    ];
    divResultadoBusquedaRuta.innerHTML = buscarRutaPorZona(zonaBuscada, rutasSimuladas);
  });
}

if (btnVerReportes) {
  btnVerReportes.addEventListener("click", () => {
    const reportesBD = [
      { zona: "Cala Cala", fecha: "2026-04-18", estado: "Pendiente", mensaje: "Basura en la esquina" },
      { zona: "Muyurina", fecha: "2026-04-19", estado: "Atendido", mensaje: "Contenedor lleno" }
    ];

    const resumen = obtenerResumenReportes(reportesBD);

    if (resumen.length === 0) {
      divListaReportes.innerHTML = "<p>No hay reportes registrados</p>";
      return;
    }

    let html = "<ul>";
    resumen.forEach(reporte => {
      html += `<li>Zona: ${reporte.zona} | Fecha: ${reporte.fecha} | Estado: ${reporte.estado}</li>`;
    });
    html += "</ul>";

    divListaReportes.innerHTML = html;
  });
}