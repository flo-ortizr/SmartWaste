import crearReporte, { validarFoto, obtenerReportesCercanos } from "./reportes.js";
import { buscarRutaPorZona } from "./rutas.js";
import { mostrarHorario } from "./horarios.js";

// Protección de ruta: solo ciudadanos
const token = localStorage.getItem("jwt_token");
const rol   = localStorage.getItem("smartwaste_rol");
if (!token)            window.location.href = "./index.html";
if (rol === "emsa")    window.location.href = "./emsa.html";

const formReporte              = document.querySelector("#reporte-form");
const divReporte               = document.querySelector("#resultado-div");
const inputMensaje             = document.querySelector("#mensaje_reporte");
const inputZonaReporte         = document.querySelector("#zona_reporte");
const inputFechaReporte        = document.querySelector("#fecha_reporte");
const inputFotoReporte         = document.querySelector("#foto_reporte");
const divVistaPreviaFoto       = document.querySelector("#vista-previa-foto-div");
const btnVerHorarios           = document.querySelector("#btn-ver-horarios");
const inputZonaHorario         = document.querySelector("#zona_horario");
const divHorarios              = document.querySelector("#resultado-horarios-div");
const btnBuscarRuta            = document.querySelector("#btn-buscar-ruta");
const inputBuscarZona          = document.querySelector("#buscar_zona_ruta");
const divResultadoBusquedaRuta = document.querySelector("#resultado-busqueda-ruta-div");
<<<<<<< HEAD
const btnCerrarSesion          = document.querySelector("#btn-cerrar-sesion");
const btnReportesCercanos      = document.querySelector("#btn-reportes-cercanos");
const divReportesCercanos      = document.querySelector("#resultado-reportes-cercanos-div");
=======
const formRegistroCiudadano = document.querySelector("#registro-ciudadano-form");
const inputUsernameRegistro = document.querySelector("#username_registro");
const inputPasswordRegistro = document.querySelector("#password_registro");
const divResultadoRegistro = document.querySelector("#resultado-registro-div");
const btnCerrarSesion = document.querySelector("#btn-cerrar-sesion");
const btnReportesCercanos = document.querySelector("#btn-reportes-cercanos");
const divReportesCercanos = document.querySelector("#resultado-reportes-cercanos-div");
const botonConsultarProximaRuta = document.querySelector("#btn-proxima-ruta");
const entradaZonaProximaRuta = document.querySelector("#zona_proxima_ruta");
const contenedorResultadoProximaRuta = document.querySelector("#resultado-proxima-ruta-div");
>>>>>>> Andres-andrade2

const reportesGlobalesBD = [
  { id: "1", zona: "Las Cuadras", fecha: "2026-05-20", estado: "Pendiente", lat: -17.3950, lng: -66.1500 },
  { id: "2", zona: "Pacata",      fecha: "2026-05-19", estado: "Atendido",  lat: -17.3680, lng: -66.1210 },
  { id: "3", zona: "Centro",      fecha: "2026-05-18", estado: "Pendiente", lat: -17.3920, lng: -66.1560 }
];

const rutasBD = [
<<<<<<< HEAD
  { nombreRuta: "Ruta 1", zona: "Zona Norte - Cala Cala", dias: "Lunes, Miércoles y Viernes", cobertura: "Cala Cala" },
  { nombreRuta: "Ruta 2", zona: "Zona Sur - La Chimba",   dias: "Martes, Jueves y Sábados",   cobertura: "La Chimba" }
=======
  { nombreRuta: "Ruta 1", zona: "Zona Norte - Cala Cala", dias: "Lunes, Miércoles y Viernes", cobertura: "Cala Cala", horaEstimada: "08:30" },
  { nombreRuta: "Ruta 2", zona: "Zona Sur - La Chimba", dias: "Martes, Jueves y Sábados", cobertura: "La Chimba", horaEstimada: "15:15" }
>>>>>>> Andres-andrade2
];

// Utilidades
function mostrarError(div, mensaje) {
  div.textContent = mensaje;
  div.className = "msg msg-error";
}

function mostrarExito(div, mensaje) {
  div.textContent = mensaje;
  div.className = "msg msg-exito";
}

function mostrarVistaPreviaFoto(archivo) {
  const url = URL.createObjectURL(archivo);
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Vista previa";
  img.className = "img-vista-previa";
<<<<<<< HEAD
  divVistaPreviaFoto.innerHTML = "";
=======
  
  divVistaPreviaFoto.textContent = "";
>>>>>>> Andres-andrade2
  divVistaPreviaFoto.appendChild(img);
}

function validarFormReporte(zona, mensaje, fecha, archivoFoto) {
  if (!zona)                             return "Por favor, seleccione una zona";
  if (!mensaje || mensaje.trim() === "") return "Por favor, ingrese una descripción del reporte";
  if (!fecha)                            return "Por favor, seleccione una fecha";
  const resultadoFoto = validarFoto(archivoFoto);
  if (resultadoFoto !== "Foto válida")   return resultadoFoto;
  return null;
}

// Eventos
if (formReporte) {
  formReporte.addEventListener("submit", (event) => {
    event.preventDefault();
    const zona        = inputZonaReporte.value;
    const fecha       = inputFechaReporte.value;
    const mensaje     = inputMensaje.value;
    const archivoFoto = inputFotoReporte.files[0];

    const error = validarFormReporte(zona, mensaje, fecha, archivoFoto);
    if (error) { mostrarError(divReporte, error); return; }

    try {
      crearReporte({ zona, mensaje, fecha });
      mostrarVistaPreviaFoto(archivoFoto);
      mostrarExito(divReporte, "Reporte enviado correctamente");
      formReporte.reset();
    } catch (e) {
      mostrarError(divReporte, e.message);
    }
  });
}

if (btnVerHorarios) {
  btnVerHorarios.addEventListener("click", () => {
    const horariosSimulados = [
      { zona: "Zona Norte - Cala Cala", dias: "Lunes a Viernes", horas: "8:00 - 10:00" },
      { zona: "Zona Sur - La Chimba",   dias: "Martes a Sábado", horas: "14:00 - 16:00" }
    ];
    divHorarios.textContent = mostrarHorario(inputZonaHorario.value, horariosSimulados);
  });
}

if (btnBuscarRuta) {
  btnBuscarRuta.addEventListener("click", () => {
    divResultadoBusquedaRuta.textContent = buscarRutaPorZona(inputBuscarZona.value, rutasBD);
  });
}

if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("smartwaste_rol");
    window.location.href = "./index.html?logout=true";
  });
}

if (btnReportesCercanos) {
  btnReportesCercanos.addEventListener("click", () => {
    if (!navigator.geolocation) {
<<<<<<< HEAD
      divReportesCercanos.innerHTML = "<p class='msg msg-error'>Tu navegador no soporta geolocalización.</p>";
      return;
    }
    divReportesCercanos.innerHTML = "<p class='msg'>Identificando tu ubicación...</p>";
=======
      divReportesCercanos.textContent = "<p style='color:red'>Tu navegador no soporta geolocalización.</p>";
      return;
    }

    divReportesCercanos.textContent = "<p>Identificando su ubicación...</p>";

>>>>>>> Andres-andrade2
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const ubicacion = { lat: position.coords.latitude, lng: position.coords.longitude };
        const cercanos  = obtenerReportesCercanos(ubicacion, reportesGlobalesBD, 2.0);
        if (cercanos.length === 0) {
<<<<<<< HEAD
          divReportesCercanos.innerHTML = "<p class='msg'>No hay reportes cercanos a tu ubicación.</p>";
=======
          divReportesCercanos.textContent = "<p><strong>No existen reportes de basura acumulada cercanos a su ubicación.</strong></p>";
>>>>>>> Andres-andrade2
          return;
        }
        let html = "<h4>Reportes en tu radio (2 km):</h4><ul class='lista-reportes'>";
        cercanos.forEach(rep => {
          html += `<li class="reporte-item estado-${rep.estado.toLowerCase()}">
            <span class="estado-tag">${rep.estado}</span>
            Zona: <strong>${rep.zona}</strong> | Fecha: ${rep.fecha} | a ${rep.distancia} km
          </li>`;
        });
        html += "</ul>";
        divReportesCercanos.textContent = html;
      },
      () => {
<<<<<<< HEAD
        divReportesCercanos.innerHTML = "<p class='msg msg-error'>No se pudo acceder a tu ubicación.</p>";
=======
        divReportesCercanos.textContent = "<p style='color:red'>No se pudo acceder a tu ubicación actual.</p>";
>>>>>>> Andres-andrade2
      }
    );
  });
}

if (inputFotoReporte) {
  inputFotoReporte.addEventListener("change", () => {
    const archivo = inputFotoReporte.files[0];
<<<<<<< HEAD
    divVistaPreviaFoto.innerHTML = "";
    divReporte.innerHTML = "";
=======

    divVistaPreviaFoto.textContent = "";
    divReporte.textContent = "";

>>>>>>> Andres-andrade2
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
<<<<<<< HEAD
=======
if (botonConsultarProximaRuta) {
  botonConsultarProximaRuta.addEventListener("click", () => {
    const zonaIngresadaPorUsuario = entradaZonaProximaRuta.value.trim();

    contenedorResultadoProximaRuta.textContent = "";

    if (zonaIngresadaPorUsuario === "") {
      const parrafoErrorCampoVacio = document.createElement("p");
      parrafoErrorCampoVacio.textContent = "Por favor, seleccione una zona para ver la próxima ruta";
      parrafoErrorCampoVacio.className = "mensaje-error";
      contenedorResultadoProximaRuta.appendChild(parrafoErrorCampoVacio);
      return;
    }

    let rutaProgramadaEncontrada = null;
    const zonaIngresadaEnMinusculas = zonaIngresadaPorUsuario.toLowerCase();

    for (let indiceRuta = 0; indiceRuta < rutasBD.length; indiceRuta++) {
      const zonaBaseDatosEnMinusculas = rutasBD[indiceRuta].zona.toLowerCase();
      if (zonaBaseDatosEnMinusculas.includes(zonaIngresadaEnMinusculas)) {
        rutaProgramadaEncontrada = rutasBD[indiceRuta];
        break;
      }
    }

    if (rutaProgramadaEncontrada) {
      const parrafoInformacionRuta = document.createElement("p");
      const etiquetaDiaHora = document.createElement("strong");
      etiquetaDiaHora.textContent = "Próximo recorrido: ";
      
      const textoDetalleRuta = `Día: ${rutaProgramadaEncontrada.dias} | Hora estimada de llegada: ${rutaProgramadaEncontrada.horaEstimada}`;
      
      parrafoInformacionRuta.appendChild(etiquetaDiaHora);
      parrafoInformacionRuta.appendChild(document.createTextNode(textoDetalleRuta));
      contenedorResultadoProximaRuta.appendChild(parrafoInformacionRuta);
    } else {
      const parrafoRutaNoEncontrada = document.createElement("p");
      parrafoRutaNoEncontrada.textContent = "No hay próximas rutas programadas para esta zona";
      parrafoRutaNoEncontrada.className = "mensaje-error";
      contenedorResultadoProximaRuta.appendChild(parrafoRutaNoEncontrada);
    }
  });
}
>>>>>>> Andres-andrade2
