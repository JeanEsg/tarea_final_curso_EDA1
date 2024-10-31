import { Actividad } from "./actividad.js";

export class Profesor{
    constructor(nombre, actividad = []){
        this.nombre = nombre;
        this.suActividad = actividad;
    }
    
    toString(){
        return `${this.nombre} es profesor de ${this.suActividad}`;
    }
}