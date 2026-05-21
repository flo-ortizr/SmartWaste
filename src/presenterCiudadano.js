import crearReporte, { validarFoto, obtenerReportesCercanos } from "./reportes.js";
import { buscarRutaPorZona } from "./rutas.js";
import { mostrarHorario } from "./horarios.js";
import { registrarUsuario } from "./usuarios.js";

if (!localStorage.getItem("jwt_token")) {
  window.location.href = "./index.html";
}

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
const formRegistroCiudadano = document.querySelector("#registro-ciudadano-form");
const inputUsernameRegistro = document.querySelector("#username_registro");
const inputPasswordRegistro = document.querySelector("#password_registro");
const divResultadoRegistro = document.querySelector("#resultado-registro-div");
const btnCerrarSesion = document.querySelector("#btn-cerrar-sesion");
const btnReportesCercanos = document.querySelector("#btn-reportes-cercanos");
const divReportesCercanos = document.querySelector("#resultado-reportes-cercanos-div");

const reportesGlobalesBD = [
  { id: "1", zona: "Las Cuadras", fecha: "2026-05-20", estado: "Pendiente", lat: -17.3950, lng: -66.1500 }, // Cerca de la plaza
  { id: "2", zona: "Pacata", fecha: "2026-05-19", estado: "Atendido", lat: -17.3680, lng: -66.1210 },     // Lejos
  { id: "3", zona: "Centro", fecha: "2026-05-18", estado: "Pendiente", lat: -17.3920, lng: -66.1560 }     // Muy cerca
];

const rutasBD = [
  { nombreRuta: "Ruta 1", zona: "Zona Norte - Cala Cala", dias: "Lunes, Miércoles y Viernes", cobertura: "Cala Cala" },
  { nombreRuta: "Ruta 2", zona: "Zona Sur - La Chimba", dias: "Martes, Jueves y Sábados", cobertura: "La Chimba" }
];

const usuariosBD = [];

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

if (formRegistroCiudadano) {
  formRegistroCiudadano.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = inputUsernameRegistro.value;
    const password = inputPasswordRegistro.value;

    const resultado = registrarUsuario(username, password, usuariosBD);

    if (resultado === "Usuario registrado correctamente") {
      mostrarExito(divResultadoRegistro, resultado);
      formRegistroCiudadano.reset();
    } else {
      mostrarError(divResultadoRegistro, resultado);
    }
  });
}

if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "./index.html?logout=true";
  });
}

if (btnReportesCercanos) {
  btnReportesCercanos.addEventListener("click", () => {
    if (!navigator.geolocation) {
      divReportesCercanos.innerHTML = "<p style='color:red'>Tu navegador no soporta geolocalización.</p>";
      return;
    }

    divReportesCercanos.innerHTML = "<p>Identificando su ubicación...</p>";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const ubicacionUsuario = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const cercanos = obtenerReportesCercanos(ubicacionUsuario, reportesGlobalesBD, 2.0);

        if (cercanos.length === 0) {
          divReportesCercanos.innerHTML = "<p><strong>No existen reportes de basura acumulada cercanos a su ubicación.</strong></p>";
          return;
        }

        let html = "<h4>Reportes detectados en tu radio (2 km):</h4><ul>";
        cercanos.forEach(rep => {
          html += `
            <li>
              <strong>Zona:</strong> ${rep.zona} | 
              <strong>Fecha:</strong> ${rep.fecha} | 
              <strong>Estado:</strong> ${rep.estado} | 
              <strong>Distancia:</strong> a ${rep.distancia} km de ti
            </li>`;
        });
        html += "</ul>";
        divReportesCercanos.innerHTML = html;
      },
      () => {
        divReportesCercanos.innerHTML = "<p style='color:red'>No se pudo acceder a tu ubicación actual.</p>";
      }
    );
  });
}

if (inputFotoReporte) {
  inputFotoReporte.addEventListener("change", () => {
    const archivo = inputFotoReporte.files[0];

    divVistaPreviaFoto.innerHTML = "";
    divReporte.innerHTML = "";

    if (!archivo) return;

    const validacion = validarFoto(archivo);

    if (validacion !== "Foto válida") {
      mostrarError(divReporte, validacion);
      inputFotoReporte.value = "";
      return;
    }

    mostrarVistaPreviaFoto(archivo);
  });
}