import {mostrarHorario} from './horarios.js';

describe("Gestor de Horarios", () => {
    it("deberia mostrar error si no se ingresa zona", () => {
        expect(mostrarHorario("", [])).toEqual("Por favor, ingrese una zona válida");
    });
});