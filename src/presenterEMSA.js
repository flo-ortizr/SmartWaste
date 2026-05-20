import { mostrarRutas, crearRuta, eliminarRuta } from "./rutas.js";
import { obtenerResumenReportes, obtenerDetalleReporte } from "./reportes.js";

// DOM 
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

// VALIDACIONES
function validarFormRuta(nombre, zona, dias, cobertura) {
  if (!nombre || nombre.trim() === "") return "Por favor, ingrese un nombre de ruta";
  if (!zona || zona.trim() === "") return "Por favor, ingrese una zona";
  if (!dias || dias.trim() === "") return "Por favor, ingrese los días";
  if (!cobertura || cobertura.trim() === "") return "Por favor, ingrese la cobertura";
  return null;
}

// RENDERIZADO 
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

// EVENTOS 
if (btnVerRutas) {
  btnVerRutas.addEventListener("click", () => {
    const resultado = mostrarRutas(rutasBD);
    renderizarListaRutas(resultado, divListaRutas);
  });
}

if (formRuta) {
  formRuta.addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = inputNombreRuta.value;
    const zona = inputZonaRuta.value;
    const dias = inputDiasRuta.value;
    const cobertura = inputCoberturaRuta.value;

    const errorVista = validarFormRuta(nombre, zona, dias, cobertura);
    if (errorVista) {
      mostrarError(divRuta, errorVista);
      return;
    }

    try {
      const nuevaRuta = crearRuta(nombre, zona, dias, cobertura);
      
      rutasBD.push(nuevaRuta);
      mostrarExito(divRuta, "Ruta registrada correctamente");
      formRuta.reset();
      divListaRutas.innerHTML = mostrarRutas(rutasBD);
      
    } catch (error) {
      mostrarError(divRuta, error.message);
    }
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