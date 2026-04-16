import {mostrarHorario} from './horarios.js';

describe("Gestor de Horarios", () => {
    it("deberia mostrar error si no se ingresa zona", () => {
        expect(mostrarHorario("", [])).toEqual("Por favor, ingrese una zona válida");
    });

    it("deberia mostrar mensaje si no existen horarios para la zona", () => {
        const horarios = [{zona: "Norte", dias: "Lunes a Viernes", horas: "8:00 - 10:00"}];
        expect(mostrarHorario("Sur", horarios)).toEqual("No existen horarios de recolección registrados para esta zona");
    });
});