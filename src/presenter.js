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

// FUNCION AUXILIAR PARA MENSAJES
function mostrarMensaje(elemento, texto, claseCSS) {
  elemento.textContent = texto;
  elemento.className = claseCSS;
}

function renderizarListaRutas(resultado, contenedor) {
  contenedor.innerHTML = "";

  if (typeof resultado === "string") {
    const p = document.createElement("p");
    p.textContent = resultado;
    contenedor.appendChild(p);
    return;
  }

  const ul = document.createElement("ul");
  resultado.forEach(ruta => {
    const li = document.createElement("li");
    li.textContent = `Zona: ${ruta.zona} - Días: ${ruta.dias}`;
    ul.appendChild(li);
  });
  
  contenedor.appendChild(ul);
}

if (formReporte) {
  formReporte.addEventListener("submit", (event) => {
    event.preventDefault();
    const zona = inputZonaReporte.value;
    const fecha = inputFechaReporte.value;
    const mensaje = inputMensaje.value;
    const archivoFoto = inputFotoReporte.files[0];

    if (!zona) {
      mostrarMensaje(divReporte, "Por favor, seleccione una zona", "mensaje-error");
      return;
    }
    if (!mensaje || mensaje.trim() === "") {
      mostrarMensaje(divReporte, "Por favor, ingrese una descripción del reporte", "mensaje-error");
      return;
    }
    if (!fecha) {
      mostrarMensaje(divReporte, "Por favor, seleccione una fecha", "mensaje-error");
      return;
    }

    const resultadoFoto = validarFoto(archivoFoto);
    if (resultadoFoto !== "Foto válida") {
      mostrarMensaje(divReporte, resultadoFoto, "mensaje-error");
      return;
    }

    const resultado = crearReporte({ zona, mensaje, fecha });
    if (typeof resultado === "string") {
      mostrarMensaje(divReporte, resultado, "mensaje-error");
    } else {
      const urlImagen = URL.createObjectURL(archivoFoto);
      const img = document.createElement("img");
      img.src = urlImagen;
      img.alt = "Vista previa";
      img.className = "img-vista-previa";
      
      divVistaPreviaFoto.innerHTML = ""; 
      divVistaPreviaFoto.appendChild(img);

      mostrarMensaje(divReporte, "Reporte enviado correctamente", "mensaje-exito");
      formReporte.reset();
    }
  });
}

if (btnVerRutas) {
  btnVerRutas.addEventListener("click", () => {
    const resultado = mostrarRutas(rutasBD);
    renderizarListaRutas(resultado, divListaRutas);
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
      mostrarMensaje(divRuta, resultado, "mensaje-error");
    } else {
      rutasBD.push(resultado);
      mostrarMensaje(divRuta, "Ruta registrada correctamente", "mensaje-exito");
      formRuta.reset();
      const resultadoRutas = mostrarRutas(rutasBD);
      renderizarListaRutas(resultadoRutas, divListaRutas);
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
    divResultadoBusquedaRuta.textContent = buscarRutaPorZona(inputBuscarZona.value, rutasBD);
  });
}

if (btnVerReportes) {
  btnVerReportes.addEventListener("click", () => {
    const resumen = obtenerResumenReportes(reportesBD);
    divListaReportes.innerHTML = "";

    if (resumen.length === 0) {
      const p = document.createElement("p");
      p.textContent = "No existen reportes registrados";
      divListaReportes.appendChild(p);
      return;
    }

    const ul = document.createElement("ul");
    resumen.forEach(reporte => {
      const li = document.createElement("li");
      li.textContent = `Zona: ${reporte.zona} | Fecha: ${reporte.fecha} | Estado: ${reporte.estado} `;
      
      const btn = document.createElement("button");
      btn.className = "btn-detalle";
      btn.setAttribute("data-id", reporte.id);
      btn.textContent = "Ver Detalle";
      
      li.appendChild(btn);
      ul.appendChild(li);
    });

    divListaReportes.appendChild(ul);
    if (divDetalleReporte) divDetalleReporte.innerHTML = "";
  });
}

if (divListaReportes) {
  divListaReportes.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-detalle")) {
      const id = event.target.getAttribute("data-id");
      const detalle = obtenerDetalleReporte(id, reportesBD);
      
      if (detalle && divDetalleReporte) {
        divDetalleReporte.innerHTML = ""; 

        const hr = document.createElement("hr");
        const h3 = document.createElement("h3");
        h3.textContent = "Detalle del Reporte";

        const crearParrafo = (etiqueta, valor) => {
          const p = document.createElement("p");
          const strong = document.createElement("strong");
          strong.textContent = etiqueta + ": ";
          p.appendChild(strong);
          p.appendChild(document.createTextNode(valor));
          return p;
        };

        divDetalleReporte.append(
          hr,
          h3,
          crearParrafo("ID", detalle.id),
          crearParrafo("Zona", detalle.zona),
          crearParrafo("Fecha", detalle.fecha),
          crearParrafo("Estado", detalle.estado),
          crearParrafo("Usuario", detalle.usuario),
          crearParrafo("Descripción", detalle.mensaje)
        );
      }
    }
  });
}

if (btnEliminarRuta) {
  btnEliminarRuta.addEventListener("click", () => {
    const zona = inputZonaEliminar.value;
    const confirmacion = confirm("¿Está seguro de eliminar esta ruta?");
    const resultado = eliminarRuta(zona, rutasBD, confirmacion);

    divResultadoEliminar.textContent = resultado;

    if (resultado === "Ruta eliminada correctamente") {
      const resultadoRutas = mostrarRutas(rutasBD);
      renderizarListaRutas(resultadoRutas, divListaRutas);
    }
  });
}