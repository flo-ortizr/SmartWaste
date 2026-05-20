import crearReporte, { validarFoto, obtenerResumenReportes, obtenerDetalleReporte } from "./reportes.js";
import { mostrarRutas, crearRuta, buscarRutaPorZona } from "./rutas.js";
import { eliminarRuta } from "./rutas.js";
import { mostrarHorario, registrarHorario } from "./horarios.js";

const formReporte = document.querySelector("#reporte-form");
const divReporte = document.querySelector("#resultado-div");
const inputMensaje = document.querySelector("#mensaje_reporte");
const inputZonaReporte = document.querySelector("#zona_reporte");
const inputFechaReporte = document.querySelector("#fecha_reporte");
const inputFotoReporte = document.querySelector("#foto_reporte");
const divVistaPreviaFoto = document.querySelector("#vista-previa-foto-div");

const btnVerRutas = document.querySelector("#btn-ver-rutas");
const divListaRutas = document.querySelector("#lista-rutas-div");

const formRuta = document.querySelector("#ruta-form");
const divRuta = document.querySelector("#resultado-ruta-div");
const inputNombreRuta = document.querySelector("#nombre_ruta");
const inputZonaRuta = document.querySelector("#zona_ruta");
const inputDiasRuta = document.querySelector("#dias_ruta");
const inputCoberturaRuta = document.querySelector("#cobertura_ruta");

const btnVerHorarios = document.querySelector("#btn-ver-horarios");
const inputZonaHorario = document.querySelector("#zona_horario");
const divHorarios = document.querySelector("#resultado-horarios-div");

const inputRutaHorario = document.querySelector("#ruta_horario");
const inputHorario = document.querySelector("#horario");
const btnRegistrarHorario = document.querySelector("#btn-registrar-horario");
const divResultadoHorario = document.querySelector("#resultado-registrar-horario");

const btnBuscarRuta = document.querySelector("#btn-buscar-ruta");
const inputBuscarZona = document.querySelector("#buscar_zona_ruta");
const divResultadoBusquedaRuta = document.querySelector("#resultado-busqueda-ruta-div");

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

    const resultado = crearReporte({ zona, mensaje, fecha });
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
    divListaRutas.innerHTML = mostrarRutas(rutasBD);
  });
}

if (formRuta) {
  formRuta.addEventListener("submit", (event) => {
    event.preventDefault();

    const resultado = crearRuta(
      inputNombreRuta.value,
      inputZonaRuta.value,
      inputDiasRuta.value,
      inputCoberturaRuta.value
    );

    if (typeof resultado === "string") {
      divRuta.innerHTML = `<span style='color:red'>${resultado}</span>`;
    } else {
      rutasBD.push(resultado);
      divRuta.innerHTML = "<span style='color:green'>Ruta registrada correctamente</span>";
      formRuta.reset();
      divListaRutas.innerHTML = mostrarRutas(rutasBD);
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

if (btnRegistrarHorario) {
  btnRegistrarHorario.addEventListener("click", () => {
    try {
      const nuevoHorario = registrarHorario(
        inputRutaHorario.value,
        inputHorario.value
      );
      
      divResultadoHorario.innerHTML = `<span style='color:green'>Horario registrado correctamente</span>`;
      
    } catch (error) {
      divResultadoHorario.innerHTML = `<span style='color:red'>${error.message}</span>`;
    }
  });
}

if (btnBuscarRuta) {
  btnBuscarRuta.addEventListener("click", () => {
    buscarRutaPorZona(inputBuscarZona.value, rutasBD);
  });
}

if (btnVerReportes) {
  btnVerReportes.addEventListener("click", () => {
    const resumen = obtenerResumenReportes(reportesBD);
    if (resumen.length === 0) {
      divListaReportes.innerHTML = "<p>No existen reportes registrados</p>";
      return;
    }
    let html = "<ul>";
    resumen.forEach(reporte => {
      html += `<li>
        Zona: ${reporte.zona} | Fecha: ${reporte.fecha} | Estado: ${reporte.estado}
        <button class="btn-detalle" data-id="${reporte.id}">Ver Detalle</button>
      </li>`;
    });
    html += "</ul>";
    divListaReportes.innerHTML = html;
    if (divDetalleReporte) divDetalleReporte.innerHTML = "";
  });
}

if (divListaReportes) {
  divListaReportes.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-detalle")) {
      const id = event.target.getAttribute("data-id");
      const detalle = obtenerDetalleReporte(id, reportesBD);
      if (detalle && divDetalleReporte) {
        divDetalleReporte.innerHTML = `
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