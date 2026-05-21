import { mostrarRutas, crearRuta, eliminarRuta } from "./rutas.js";
import { ReporteService, obtenerResumenReportes, obtenerDetalleReporte } from "./reportes.js";
import { ZonaService } from "./zonas.js";

const _token = localStorage.getItem("jwt_token");
const _rol   = localStorage.getItem("smartwaste_rol");
if (!_token)         window.location.href = "./index.html";
if (_rol !== "emsa") window.location.href = "./ciudadano.html";

// Datos
const reportesBD = [
  { id: "1", zona: "Cala Cala",  fecha: "2026-04-18", estado: "Pendiente", mensaje: "Basura en la esquina",            usuario: "Juan",  cantidadBasura: "Alta",  fotos: ["img/basura1.jpg", "img/basura2.jpg"], ubicacion: "Cala Cala Cochabamba", lat: -17.3700, lng: -66.1590, atendidoPor: "", fechaAtencion: "" },
  { id: "2", zona: "Muyurina",   fecha: "2026-04-19", estado: "Atendido",  mensaje: "Contenedor lleno",                usuario: "Ana",   cantidadBasura: "Media", fotos: ["img/basura3.jpg"],                    ubicacion: "Muyurina Cochabamba",   lat: -17.3795, lng: -66.1430, atendidoPor: "Personal EMSA", fechaAtencion: "2026-04-19 14:30" },
  { id: "3", zona: "Cala Cala",  fecha: "2026-04-20", estado: "Pendiente", mensaje: "Acumulación frente al mercado",    usuario: "Luis",  cantidadBasura: "Alta",  fotos: [],                                      ubicacion: "Cala Cala Cochabamba", lat: -17.3710, lng: -66.1600, atendidoPor: "", fechaAtencion: "" },
  { id: "4", zona: "Cala Cala",  fecha: "2026-04-21", estado: "Pendiente", mensaje: "Desmonte sin recoger",             usuario: "María", cantidadBasura: "Baja",  fotos: [],                                      ubicacion: "Cala Cala Cochabamba", lat: -17.3720, lng: -66.1580, atendidoPor: "", fechaAtencion: "" },
  { id: "5", zona: "Tupuraya",   fecha: "2026-04-22", estado: "Pendiente", mensaje: "Basura en la calle principal",     usuario: "Pedro", cantidadBasura: "Alta",  fotos: [],                                      ubicacion: "Tupuraya Cochabamba",   lat: -17.3800, lng: -66.1700, atendidoPor: "", fechaAtencion: "" },
  { id: "6", zona: "Tupuraya",   fecha: "2026-04-23", estado: "Pendiente", mensaje: "Contenedor desbordado",            usuario: "Sofía", cantidadBasura: "Media", fotos: [],                                      ubicacion: "Tupuraya Cochabamba",   lat: -17.3810, lng: -66.1710, atendidoPor: "", fechaAtencion: "" },
  { id: "7", zona: "Tupuraya",   fecha: "2026-04-24", estado: "Pendiente", mensaje: "Sin recolección hace 3 días",      usuario: "Carlos",cantidadBasura: "Alta",  fotos: [],                                      ubicacion: "Tupuraya Cochabamba",   lat: -17.3820, lng: -66.1720, atendidoPor: "", fechaAtencion: "" },
  { id: "8", zona: "Muyurina",   fecha: "2026-04-25", estado: "Pendiente", mensaje: "Bolsas en la vereda",              usuario: "Elena", cantidadBasura: "Baja",  fotos: [],                                      ubicacion: "Muyurina Cochabamba",   lat: -17.3790, lng: -66.1440, atendidoPor: "", fechaAtencion: "" }
];

const rutasBD = [
  { nombreRuta: "Ruta 1", zona: "Zona Norte - Cala Cala", dias: "Lunes, Miércoles y Viernes", cobertura: "Cala Cala" },
  { nombreRuta: "Ruta 2", zona: "Zona Sur - La Chimba",   dias: "Martes, Jueves y Sábados",   cobertura: "La Chimba" }
];

const USUARIO_EMSA = "Personal EMSA";
const reporteService = new ReporteService(reportesBD);
const zonaService = new ZonaService(reportesBD);

const $ = id => document.querySelector(id);

// DOM
const btnVerRutas       = $("#btn-ver-rutas");
const divListaRutas     = $("#lista-rutas-div");
const formRuta          = $("#ruta-form");
const divRuta           = $("#resultado-ruta-div");
const inputNombreRuta   = $("#nombre_ruta");
const inputZonaRuta     = $("#zona_ruta");
const inputDiasRuta     = $("#dias_ruta");
const inputCoberturaRuta = $("#cobertura_ruta");
const btnVerReportes    = $("#btn-ver-reportes");
const divListaReportes  = $("#lista-reportes-div");
const divDetalleReporte = $("#detalle-reporte-div");
const btnEliminarRuta   = $("#btn-eliminar-ruta");
const inputZonaEliminar = $("#zona_eliminar");
const divResultadoEliminar = $("#resultado-eliminar-div");
const btnVerZonas       = $("#btn-ver-zonas");
const selectOrdenZonas  = $("#orden-zonas");
const divListaZonas     = $("#lista-zonas-div");
const divReportesZona   = $("#reportes-zona-div");

const formularioModificarRutaEmsa = $("#formulario-modificar-ruta");
const entradaIdentificadorRutaModificar = $("#identificador_ruta_modificar");
const entradaNombreRutaModificar = $("#nombre_ruta_modificar");
const entradaZonaRutaModificar = $("#zona_ruta_modificar");
const entradaDiasRutaModificar = $("#dias_ruta_modificar");
const entradaCoberturaRutaModificar = $("#cobertura_ruta_modificar");
const contenedorResultadoModificacionRuta = $("#resultado-modificacion-ruta-div");
const btnCerrarSesionEMSA = $("#btn-cerrar-sesion");

function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = tipo === "error" ? "msg msg-error" : "msg msg-exito";
}

function crearParrafo(etiqueta, valor) {
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = etiqueta + ": ";
  p.appendChild(strong);
  p.appendChild(document.createTextNode(valor || "No disponible"));
  return p;
}

function validarFormRuta(nombre, zona, dias, cobertura) {
  if (!nombre || nombre.trim() === "") return "Por favor, ingrese un nombre de ruta";
  if (!zona   || zona.trim()   === "") return "Por favor, ingrese una zona";
  if (!dias   || dias.trim()   === "") return "Por favor, ingrese los días";
  if (!cobertura || cobertura.trim() === "") return "Por favor, ingrese la cobertura";
  return null;
}

function renderizarZonasConConteo(zonasOrdenadas, contenedor) {
  contenedor.innerHTML = "";
  if (zonasOrdenadas.length === 0) {
    contenedor.innerHTML = "<p class='msg'>No hay zonas con reportes pendientes.</p>";
    return;
  }
  const ul = document.createElement("ul");
  ul.className = "lista-zonas";
  zonasOrdenadas.forEach(zona => {
    const li = document.createElement("li");
    li.className = zona.critica ? "zona-card zona-critica" : "zona-card zona-normal";
    const etiqueta = zona.critica ? `<span class="badge-critica">⚠ CRÍTICA</span>` : "";
    li.innerHTML = `
      <div class="zona-info">
        <span class="zona-nombre">${zona.zona}</span>
        ${etiqueta}
        <span class="zona-cantidad">${zona.cantidad} reporte(s) pendiente(s)</span>
      </div>`;
    const btn = document.createElement("button");
    btn.textContent = "Ver reportes";
    btn.className = "btn btn-secundario";
    btn.setAttribute("data-zona", zona.zona);
    li.appendChild(btn);
    ul.appendChild(li);
  });
  contenedor.appendChild(ul);
}

function mostrarZonasOrdenadas() {
  const orden = selectOrdenZonas ? selectOrdenZonas.value : "descendente";
  const zonasConConteo = zonaService.obtenerZonasConConteo();
  const zonasOrdenadas = zonaService.ordenarZonas(zonasConConteo, orden);
  renderizarZonasConConteo(zonasOrdenadas, divListaZonas);
  if (divReportesZona) divReportesZona.innerHTML = "";
}

function renderizarReportesDeZona(zona, contenedor) {
  contenedor.innerHTML = "";
  const reportes = zonaService.filtrarReportesPorZona(zona);
  const h3 = document.createElement("h3");
  h3.textContent = `Reportes de ${zona}`;
  contenedor.appendChild(h3);
  if (reportes.length === 0) {
    contenedor.innerHTML += "<p class='msg'>No hay reportes para esta zona.</p>";
    return;
  }
  const ul = document.createElement("ul");
  ul.className = "lista-reportes-zona";
  reportes.forEach(r => {
    const li = document.createElement("li");
    li.className = `reporte-item estado-${r.estado.toLowerCase()}`;
    li.innerHTML = `<span class="estado-tag">${r.estado}</span> ${r.fecha} — ${r.mensaje} <em>(${r.usuario})</em>`;
    ul.appendChild(li);
  });
  contenedor.appendChild(ul);
}

// Renderizar Rutas
function renderizarListaRutas(resultado, contenedor) {
  contenedor.innerHTML = "";
  
  if (typeof resultado === "string") {
    contenedor.innerHTML = `<p class="msg">${resultado}</p>`;
    return;
  }
  
  if (resultado.length === 0) {
    contenedor.innerHTML = `<p class="msg">No hay rutas registradas.</p>`;
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "lista-rutas";
  resultado.forEach((ruta, indiceDeArregloRuta) => {
    const li = document.createElement("li");
    li.className = "ruta-item";
    li.innerHTML = `<strong>${ruta.nombreRuta}</strong> — Zona: ${ruta.zona} | Días: ${ruta.dias}`;
    
    const botonSeleccionarModificarRuta = document.createElement("button");
    botonSeleccionarModificarRuta.textContent = "Editar";
    botonSeleccionarModificarRuta.className = "btn btn-secundario btn-editar-ruta";
    botonSeleccionarModificarRuta.style.marginLeft = "12px";
    botonSeleccionarModificarRuta.setAttribute("data-indice-ruta", indiceDeArregloRuta);

    li.appendChild(botonSeleccionarModificarRuta);
    ul.appendChild(li);
  });
  contenedor.appendChild(ul);
}

function crearVisorFoto(foto) {
  const visor = document.createElement("div");
  visor.className = "visor-foto";
  const img = document.createElement("img");
  img.src = foto;
  img.alt = "Foto ampliada";
  visor.appendChild(img);
  visor.addEventListener("click", () => visor.remove());
  return visor;
}

function crearContenedorFotos(fotos) {
  const contenedor = document.createElement("div");
  contenedor.className = "fotos-adjuntas";
  const titulo = document.createElement("h4");
  titulo.textContent = "Fotos adjuntas";
  contenedor.appendChild(titulo);
  if (!fotos || fotos.length === 0) {
    contenedor.innerHTML += "<p>No existen fotos adjuntas.</p>";
    return contenedor;
  }
  fotos.forEach(foto => {
    const img = document.createElement("img");
    img.src = foto;
    img.alt = "Foto del reporte";
    img.className = "foto-miniatura";
    img.addEventListener("click", () => document.body.appendChild(crearVisorFoto(foto)));
    contenedor.appendChild(img);
  });
  return contenedor;
}

function crearSeccionMapa(detalle) {
  const urlBase = detalle.lat && detalle.lng
    ? `https://maps.google.com/maps?q=${detalle.lat},${detalle.lng}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(detalle.ubicacion)}`;
  const titulo = document.createElement("h4");
  titulo.textContent = "Ubicación del reporte";
  const mapa = document.createElement("iframe");
  mapa.width = "100%";
  mapa.height = "250";
  mapa.style.border = "0";
  mapa.loading = "lazy";
  mapa.referrerPolicy = "no-referrer-when-downgrade";
  mapa.src = urlBase + "&z=17&output=embed";
  const enlace = document.createElement("a");
  enlace.href = urlBase;
  enlace.target = "_blank";
  enlace.textContent = "Abrir en Google Maps →";
  enlace.className = "enlace-mapa";
  return { titulo, mapa, enlace };
}

function crearBotonAtender(detalle) {
  const contenedor = document.createElement("div");
  contenedor.className = "acciones-estado";
  const btn = document.createElement("button");
  btn.textContent = "Marcar como Atendido";
  btn.className = "btn btn-atender";
  if (detalle.estado === "Atendido") {
    btn.disabled = true;
    btn.classList.add("btn-deshabilitado");
    const msg = document.createElement("p");
    msg.textContent = "Este reporte ya fue atendido.";
    msg.className = "msg msg-exito";
    contenedor.append(btn, msg);
  } else {
    btn.addEventListener("click", () => {
      reporteService.marcarAtendido(detalle.id, USUARIO_EMSA);
      renderizarDetalleReporte(detalle);
    });
    contenedor.appendChild(btn);
  }
  return contenedor;
}

function renderizarDetalleReporte(detalle) {
  divDetalleReporte.innerHTML = "";
  const card = document.createElement("div");
  card.className = "detalle-card";
  const h3 = document.createElement("h3");
  h3.textContent = "Detalle del Reporte";
  const { titulo: tituloMapa, mapa, enlace } = crearSeccionMapa(detalle);
  const btnVolver = document.createElement("button");
  btnVolver.textContent = "← Volver";
  btnVolver.className = "btn btn-secundario";
  btnVolver.addEventListener("click", () => { divDetalleReporte.innerHTML = ""; });
  card.append(
    h3,
    crearParrafo("ID", detalle.id),
    crearParrafo("Zona", detalle.zona),
    crearParrafo("Descripción", detalle.mensaje),
    crearParrafo("Cantidad de basura", detalle.cantidadBasura),
    crearParrafo("Fecha", detalle.fecha),
    crearParrafo("Estado", detalle.estado),
    crearParrafo("Ciudadano", detalle.usuario),
    crearParrafo("Ubicación", detalle.ubicacion),
    crearParrafo("Atendido por", detalle.atendidoPor),
    crearParrafo("Fecha de atención", detalle.fechaAtencion),
    crearContenedorFotos(detalle.fotos),
    tituloMapa,
    mapa,
    enlace,
    crearBotonAtender(detalle),
    btnVolver
  );
  divDetalleReporte.appendChild(card);
}

function renderizarListaReportes(resumen, contenedor) {
  contenedor.innerHTML = "";
  if (resumen.length === 0) {
    contenedor.innerHTML = "<p class='msg'>No existen reportes registrados.</p>";
    return;
  }
  const ul = document.createElement("ul");
  ul.className = "lista-reportes";
  resumen.forEach(reporte => {
    const li = document.createElement("li");
    li.className = `reporte-item estado-${reporte.estado.toLowerCase()}`;
    li.innerHTML = `<span class="estado-tag">${reporte.estado}</span> Zona: <strong>${reporte.zona}</strong> | Fecha: ${reporte.fecha}`;
    const btn = document.createElement("button");
    btn.className = "btn btn-secundario btn-detalle";
    btn.setAttribute("data-id", reporte.id);
    btn.textContent = "Ver Detalle";
    li.appendChild(btn);
    ul.appendChild(li);
  });
  contenedor.appendChild(ul);
}

// Eventos
if (btnVerZonas) {
  btnVerZonas.addEventListener("click", mostrarZonasOrdenadas);
}

if (selectOrdenZonas) {
  selectOrdenZonas.addEventListener("change", () => {
    if (divListaZonas && divListaZonas.innerHTML !== "") mostrarZonasOrdenadas();
  });
}

if (divListaZonas) {
  divListaZonas.addEventListener("click", event => {
    const btn = event.target.closest("[data-zona]");
    if (btn) renderizarReportesDeZona(btn.getAttribute("data-zona"), divReportesZona);
  });
}

if (btnVerRutas) {
  btnVerRutas.addEventListener("click", () => {
    renderizarListaRutas(rutasBD, divListaRutas);
  });
}

if (formRuta) {
  formRuta.addEventListener("submit", event => {
    event.preventDefault();
    const nombre    = inputNombreRuta.value;
    const zona      = inputZonaRuta.value;
    const dias      = inputDiasRuta.value;
    const cobertura = inputCoberturaRuta.value;
    const error = validarFormRuta(nombre, zona, dias, cobertura);
    if (error) { mostrarMensaje(divRuta, error, "error"); return; }
    try {
      const nueva = crearRuta(nombre, zona, dias, cobertura);
      rutasBD.push(nueva);
      mostrarMensaje(divRuta, "Ruta registrada correctamente", "exito");
      formRuta.reset();
      renderizarListaRutas(rutasBD, divListaRutas);
    } catch (e) {
      mostrarMensaje(divRuta, e.message, "error");
    }
  });
}

if (btnVerReportes) {
  btnVerReportes.addEventListener("click", () => {
    const resumen = obtenerResumenReportes(reportesBD);
    renderizarListaReportes(resumen, divListaReportes);
    if (divDetalleReporte) divDetalleReporte.innerHTML = "";
  });
}

if (divListaReportes) {
  divListaReportes.addEventListener("click", event => {
    const btn = event.target.closest("[data-id]");
    if (btn) {
      const detalle = obtenerDetalleReporte(btn.getAttribute("data-id"), reportesBD);
      if (detalle) renderizarDetalleReporte(detalle);
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
      renderizarListaRutas(rutasBD, divListaRutas);
    }
  });
}

if (btnCerrarSesionEMSA) {
  btnCerrarSesionEMSA.addEventListener("click", () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("smartwaste_rol");
    window.location.href = "./index.html?logout=true";
  });
}

if (divListaRutas) {
  divListaRutas.addEventListener("click", (eventoInteraccionUsuarioEdicion) => {
    if (eventoInteraccionUsuarioEdicion.target.classList.contains("btn-editar-ruta")) {
      const indiceRutaSeleccionada = eventoInteraccionUsuarioEdicion.target.getAttribute("data-indice-ruta");
      const rutaRecuperadaParaEdicion = rutasBD[indiceRutaSeleccionada];

      entradaIdentificadorRutaModificar.value = indiceRutaSeleccionada;
      entradaNombreRutaModificar.value = rutaRecuperadaParaEdicion.nombreRuta;
      entradaZonaRutaModificar.value = rutaRecuperadaParaEdicion.zona;
      entradaDiasRutaModificar.value = rutaRecuperadaParaEdicion.dias;
      entradaCoberturaRutaModificar.value = rutaRecuperadaParaEdicion.cobertura;

      if (formularioModificarRutaEmsa) {
        formularioModificarRutaEmsa.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}

if (formularioModificarRutaEmsa) {
  formularioModificarRutaEmsa.addEventListener("submit", (eventoEnvioFormularioEdicion) => {
    eventoEnvioFormularioEdicion.preventDefault();

    const indiceRutaModificada = entradaIdentificadorRutaModificar.value;
    const nombreRutaModificada = entradaNombreRutaModificar.value.trim();
    const zonaRutaModificada = entradaZonaRutaModificar.value.trim();
    const diasRutaModificada = entradaDiasRutaModificar.value.trim();
    const coberturaRutaModificada = entradaCoberturaRutaModificar.value.trim();

    contenedorResultadoModificacionRuta.innerHTML = "";

    if (indiceRutaModificada === "") {
      mostrarMensaje(contenedorResultadoModificacionRuta, "Primero seleccione una ruta haciendo clic en 'Editar'", "error");
      return;
    }

    if (nombreRutaModificada === "" || zonaRutaModificada === "" || diasRutaModificada === "" || coberturaRutaModificada === "") {
      mostrarMensaje(contenedorResultadoModificacionRuta, "Por favor, complete los campos requeridos", "error");
      return;
    }

    rutasBD[indiceRutaModificada].nombreRuta = nombreRutaModificada;
    rutasBD[indiceRutaModificada].zona = zonaRutaModificada;
    rutasBD[indiceRutaModificada].dias = diasRutaModificada;
    rutasBD[indiceRutaModificada].cobertura = coberturaRutaModificada;

    mostrarMensaje(contenedorResultadoModificacionRuta, "Ruta modificada correctamente", "exito");

    formularioModificarRutaEmsa.reset();
    entradaIdentificadorRutaModificar.value = "";

    renderizarListaRutas(rutasBD, divListaRutas);
  });
}