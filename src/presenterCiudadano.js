import CrearReporte, { validarFoto } from "./reportes.js";
import { buscarRutaPorZona } from "./rutas.js";
import { mostrarHorario } from "./horarios.js";

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
  {
    nombreRuta: "Ruta 1",
    zona: "Zona Norte - Cala Cala",
    dias: "Lunes, Miércoles y Viernes",
    cobertura: "Cala Cala"
  },
  {
    nombreRuta: "Ruta 2",
    zona: "Zona Sur - La Chimba",
    dias: "Martes, Jueves y Sábados",
    cobertura: "La Chimba"
  }
];

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

if (btnVerHorarios) {
  btnVerHorarios.addEventListener("click", () => {
    const horariosSimulados = [
      { zona: "Zona Norte - Cala Cala", dias: "Lunes a Viernes", horas: "8:00 - 10:00" },
      { zona: "Zona Sur - La Chimba", dias: "Martes a Sábado", horas: "14:00 - 16:00" }
    ];
    divHorarios.innerHTML = mostrarHorario(inputZonaHorario.value, horariosSimulados);
  });
}

if (btnBuscarRuta) {
  btnBuscarRuta.addEventListener("click", () => {
    divResultadoBusquedaRuta.innerHTML = buscarRutaPorZona(inputBuscarZona.value, rutasBD);
  });
}