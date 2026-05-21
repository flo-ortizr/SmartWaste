import {
  contarReportesPendientesPorZona,
  esZonaCritica,
  obtenerZonasConConteo,
  ordenarZonasPorReportes,
  filtrarReportesPorZona,
  UMBRAL_CRITICO
} from "./zonas.js";

const reportesSimulados = [
  { id: "1", zona: "Cala Cala", estado: "Pendiente" },
  { id: "2", zona: "Cala Cala", estado: "Pendiente" },
  { id: "3", zona: "Cala Cala", estado: "Pendiente" },
  { id: "4", zona: "Muyurina", estado: "Pendiente" },
  { id: "5", zona: "Muyurina", estado: "Atendido" },
  { id: "6", zona: "Tupuraya", estado: "Pendiente" },
  { id: "7", zona: "Tupuraya", estado: "Pendiente" },
  { id: "8", zona: "Cala Cala", estado: "Atendido" }
];

describe("contarReportesPendientesPorZona", () => {
  test("debería devolver objeto vacío si no hay reportes", () => {
    expect(contarReportesPendientesPorZona([])).toEqual({});
  });

  test("debería contar solo reportes con estado Pendiente", () => {
    const resultado = contarReportesPendientesPorZona(reportesSimulados);
    expect(resultado["Cala Cala"]).toBe(3);
    expect(resultado["Muyurina"]).toBe(1);
    expect(resultado["Tupuraya"]).toBe(2);
  });

  test("debería ignorar reportes con estado Atendido", () => {
    const resultado = contarReportesPendientesPorZona(reportesSimulados);
    expect(resultado["Cala Cala"]).not.toBe(4);
  });
});

describe("esZonaCritica", () => {
  test("debería retornar true si la zona supera el umbral de reportes pendientes", () => {
    expect(esZonaCritica("Cala Cala", reportesSimulados)).toBe(true);
  });

  test("debería retornar false si la zona no supera el umbral", () => {
    expect(esZonaCritica("Muyurina", reportesSimulados)).toBe(false);
  });

  test("debería retornar false si la zona no existe en los reportes", () => {
    expect(esZonaCritica("Sarco", reportesSimulados)).toBe(false);
  });

  test("debería usar umbral personalizado si se provee", () => {
    expect(esZonaCritica("Tupuraya", reportesSimulados, 2)).toBe(true);
  });

  test("debería retornar false si la lista de reportes es nula", () => {
    expect(esZonaCritica("Cala Cala", null)).toBe(false);
  });
});

describe("obtenerZonasConConteo", () => {
  test("debería devolver lista vacía si no hay reportes", () => {
    expect(obtenerZonasConConteo([])).toEqual([]);
  });

  test("debería marcar como crítica la zona que supera el umbral", () => {
    const resultado = obtenerZonasConConteo(reportesSimulados);
    const calaCala = resultado.find(z => z.zona === "Cala Cala");
    expect(calaCala.critica).toBe(true);
  });

  test("debería marcar como no crítica la zona que no supera el umbral", () => {
    const resultado = obtenerZonasConConteo(reportesSimulados);
    const muyurina = resultado.find(z => z.zona === "Muyurina");
    expect(muyurina.critica).toBe(false);
  });

  test("debería incluir zona, cantidad y critica en cada elemento", () => {
    const resultado = obtenerZonasConConteo(reportesSimulados);
    expect(resultado[0]).toHaveProperty("zona");
    expect(resultado[0]).toHaveProperty("cantidad");
    expect(resultado[0]).toHaveProperty("critica");
  });
});

describe("ordenarZonasPorReportes", () => {
  const zonas = [
    { zona: "Muyurina", cantidad: 1, critica: false },
    { zona: "Cala Cala", cantidad: 3, critica: true },
    { zona: "Tupuraya", cantidad: 2, critica: false }
  ];

  test("debería ordenar de mayor a menor por defecto (descendente)", () => {
    const resultado = ordenarZonasPorReportes(zonas);
    expect(resultado[0].zona).toBe("Cala Cala");
    expect(resultado[2].zona).toBe("Muyurina");
  });

  test("debería ordenar de menor a mayor cuando se indica ascendente", () => {
    const resultado = ordenarZonasPorReportes(zonas, "ascendente");
    expect(resultado[0].zona).toBe("Muyurina");
    expect(resultado[2].zona).toBe("Cala Cala");
  });

  test("no debería modificar el arreglo original", () => {
    const original = [...zonas];
    ordenarZonasPorReportes(zonas, "ascendente");
    expect(zonas[0].zona).toBe(original[0].zona);
  });

  test("debería devolver lista vacía si no hay zonas", () => {
    expect(ordenarZonasPorReportes([])).toEqual([]);
  });
});

describe("filtrarReportesPorZona", () => {
  test("debería retornar solo los reportes de la zona indicada", () => {
    const resultado = filtrarReportesPorZona("Cala Cala", reportesSimulados);
    expect(resultado.length).toBe(4);
    resultado.forEach(r => expect(r.zona).toBe("Cala Cala"));
  });

  test("debería retornar lista vacía si la zona no tiene reportes", () => {
    const resultado = filtrarReportesPorZona("Sarco", reportesSimulados);
    expect(resultado).toEqual([]);
  });

  test("debería retornar lista vacía si la lista de reportes es nula", () => {
    expect(filtrarReportesPorZona("Cala Cala", null)).toEqual([]);
  });
});
