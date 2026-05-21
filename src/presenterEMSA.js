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

// DATOS
const reportesBD = [
  {
    id: "1",
    zona: "Cala Cala",
    fecha: "2026-04-18",
    estado: "Pendiente",
    mensaje: "Basura en la esquina",
    usuario: "Juan",
    cantidadBasura: "Alta",
    fotos: ["img/basura1.jpg", "img/basura2.jpg"],
    ubicacion: "Cala Cala Cochabamba Bolivia",
    lat: -17.3700,
    lng: -66.1590,
    atendidoPor: "",
    fechaAtencion: ""
  },
  {
    id: "2",
    zona: "Muyurina",
    fecha: "2026-04-19",
    estado: "Atendido",
    mensaje: "Contenedor lleno",
    usuario: "Ana",
    cantidadBasura: "Media",
    fotos: ["img/basura3.jpg"],
    ubicacion: "Muyurina Cochabamba Bolivia",
    lat: -17.3795,
    lng: -66.1430,
    atendidoPor: "Personal EMSA",
    fechaAtencion: "2026-04-19 14:30"
  }
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

const usuarioAdminActual = "Personal EMSA";
let mensajeEstadoReporte = "";

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

function crearParrafo(etiqueta, valor) {
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = etiqueta + ": ";
  p.appendChild(strong);
  p.appendChild(document.createTextNode(valor || "No disponible"));
  return p;
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
  resultado.forEach((ruta) => {
    const li = document.createElement("li");
    li.textContent = `Zona: ${ruta.zona} - Días: ${ruta.dias}`;
    ul.appendChild(li);
  });

  contenedor.appendChild(ul);
}

function crearVisorFoto(foto) {
  const visor = document.createElement("div");
  visor.style.position = "fixed";
  visor.style.top = "0";
  visor.style.left = "0";
  visor.style.width = "100%";
  visor.style.height = "100%";
  visor.style.backgroundColor = "rgba(0,0,0,0.8)";
  visor.style.display = "flex";
  visor.style.justifyContent = "center";
  visor.style.alignItems = "center";
  visor.style.zIndex = "9999";

  const imagenGrande = document.createElement("img");
  imagenGrande.src = foto;
  imagenGrande.alt = "Foto ampliada";
  imagenGrande.style.maxWidth = "80%";
  imagenGrande.style.maxHeight = "80%";
  imagenGrande.style.border = "3px solid white";

  visor.appendChild(imagenGrande);
  visor.addEventListener("click", () => visor.remove());

  return visor;
}

function crearContenedorFotos(fotos) {
  const contenedorFotos = document.createElement("div");
  const tituloFotos = document.createElement("h4");
  tituloFotos.textContent = "Fotos adjuntas";
  contenedorFotos.appendChild(tituloFotos);

  if (!fotos || fotos.length === 0) {
    const pSinFotos = document.createElement("p");
    pSinFotos.textContent = "No existen fotos adjuntas";
    contenedorFotos.appendChild(pSinFotos);
    return contenedorFotos;
  }

  fotos.forEach((foto) => {
    const img = document.createElement("img");
    img.src = foto;
    img.alt = "Foto del reporte";
    img.width = 120;
    img.style.marginRight = "10px";
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      document.body.appendChild(crearVisorFoto(foto));
    });

    contenedorFotos.appendChild(img);
  });

  return contenedorFotos;
}

function crearSeccionMapa(detalle) {
  const urlBase = detalle.lat && detalle.lng
    ? `https://www.google.com/maps?q=${detalle.lat},${detalle.lng}`
    : `https://www.google.com/maps?q=${encodeURIComponent(detalle.ubicacion)}`;

  const tituloMapa = document.createElement("h4");
  tituloMapa.textContent = "Ubicación del reporte";

  const mapa = document.createElement("iframe");
  mapa.width = "400";
  mapa.height = "250";
  mapa.style.border = "0";
  mapa.loading = "lazy";
  mapa.referrerPolicy = "no-referrer-when-downgrade";
  mapa.src = urlBase + "&z=17&output=embed";

  const enlaceMapa = document.createElement("a");
  enlaceMapa.href = urlBase;
  enlaceMapa.target = "_blank";
  enlaceMapa.textContent = "Abrir en Google Maps";

  return { tituloMapa, mapa, enlaceMapa };
}

function marcarReporteComoAtendido(detalle) {
  detalle.estado = "Atendido";
  detalle.atendidoPor = usuarioAdminActual;
  detalle.fechaAtencion = new Date().toLocaleString();
  mensajeEstadoReporte = 'Estado del reporte actualizado a "Atendido" correctamente';
}

function crearBotonAtender(detalle) {
  const contenedorEstado = document.createElement("div");

  const btnAtender = document.createElement("button");
  btnAtender.textContent = "Marcar como Atendido";

  if (detalle.estado === "Atendido") {
    btnAtender.disabled = true;

    const mensajeBloqueado = document.createElement("p");
    mensajeBloqueado.textContent = "Estado bloqueado: el reporte ya fue atendido";
    mensajeBloqueado.className = "exito";

    contenedorEstado.appendChild(btnAtender);
    contenedorEstado.appendChild(mensajeBloqueado);
  } else {
    btnAtender.addEventListener("click", () => {
      marcarReporteComoAtendido(detalle);
      renderizarDetalleReporte(detalle);
    });

    contenedorEstado.appendChild(btnAtender);
  }

  return contenedorEstado;
}

function renderizarDetalleReporte(detalle) {
  divDetalleReporte.innerHTML = "";

  const hr = document.createElement("hr");
  const h3 = document.createElement("h3");
  h3.textContent = "Detalle del Reporte";

  const { tituloMapa, mapa, enlaceMapa } = crearSeccionMapa(detalle);
  const btnAtender = crearBotonAtender(detalle);
  const mensajeConfirmacion = document.createElement("p");
  mensajeConfirmacion.textContent = mensajeEstadoReporte;
  mensajeConfirmacion.className = "exito";

  if (detalle.estado !== "Atendido") {
  mensajeEstadoReporte = "";
}

  const btnVolver = document.createElement("button");
  btnVolver.textContent = "Volver";
  btnVolver.addEventListener("click", () => {
    divDetalleReporte.innerHTML = "";
  });

  divDetalleReporte.append(
    hr,
    h3,
    crearParrafo("ID", detalle.id),
    crearParrafo("Zona", detalle.zona),
    crearParrafo("Descripción de referencia", detalle.mensaje),
    crearParrafo("Cantidad aproximada de basura", detalle.cantidadBasura),
    crearParrafo("Fecha de creación", detalle.fecha),
    crearParrafo("Estado actual", detalle.estado),
    crearParrafo("Nombre del ciudadano", detalle.usuario),
    crearParrafo("Ubicación", detalle.ubicacion),
    crearParrafo("Atendido por", detalle.atendidoPor),
    crearParrafo("Fecha y hora de atención", detalle.fechaAtencion),
    crearContenedorFotos(detalle.fotos),
    tituloMapa,
    mapa,
    enlaceMapa,
    btnVolver,
    btnAtender,
    mensajeConfirmacion
  );
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
      mostrarMensaje(divRuta, errorVista, "error");
      return;
    }

    try {
      const nuevaRuta = crearRuta(nombre, zona, dias, cobertura);
      rutasBD.push(nuevaRuta);
      mostrarMensaje(divRuta, "Ruta registrada correctamente", "exito");
      formRuta.reset();
      renderizarListaRutas(mostrarRutas(rutasBD), divListaRutas);
    } catch (error) {
      mostrarMensaje(divRuta, error.message, "error");
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
    resumen.forEach((reporte) => {
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
      renderizarListaRutas(mostrarRutas(rutasBD), divListaRutas);
    }
  });
}