import {mostrarHorario, registrarHorario} from './horarios.js';

describe("Gestor de Horarios", () => {
    it("deberia mostrar error si no se ingresa zona", () => {
        expect(mostrarHorario("", [])).toEqual("Por favor, seleccione una zona para consultar los horarios");
    });

    it("deberia mostrar mensaje si no existen horarios para la zona", () => {
        const horarios = [{zona: "Norte", dias: "Lunes a Viernes", horas: "8:00 - 10:00"}];
        expect(mostrarHorario("Sur", horarios)).toEqual("No existen horarios de recolección registrados para esta zona");
    });

    it("deberia mostrar los horarios para la zona ingresada", () => {
        const horarios = [
            {zona: "Norte", dias: "Lunes a Viernes", horas: "8:00 a 10:00"},
            {zona: "Sur", dias: "Lunes a Viernes", horas: "10:00 a 12:00"}
        ];
        expect(mostrarHorario("Norte", horarios)).toEqual("Zona Norte: Lunes a Viernes de 8:00 a 10:00");
        
    });

    it("debería lanzar un error si faltan campos", () => {
        expect(() => registrarHorario("", ""))
        .toThrow("Por favor, complete los campos requeridos");
    });

    it("debería registrar el horario correctamente", () => {
        const resultado = registrarHorario("Zona Norte", "8:00 - 10:00");
        expect(resultado).toEqual({
            ruta: "Zona Norte",
            horario: "8:00 - 10:00"
  });
    });

    it("debería devolver objeto con ruta y horario", () => {
         const resultado = registrarHorario("Zona Norte", "8:00 - 10:00");

        expect(resultado).toEqual({
                ruta: "Zona Norte",
    horario: "8:00 - 10:00"
  });
});
});