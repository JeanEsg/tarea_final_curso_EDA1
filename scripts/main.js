import { Profesor } from "./profesor.js";
import { Actividad } from "./actividad.js";
import { calcularLongestNaps } from "./utils.js";

const btnIngresar = document.getElementById("ingresar");
const btnConsultar = document.getElementById("consultar");
let salida = document.getElementById("salida");

let info = {};

btnIngresar.addEventListener("click", ingresarNuevoCaso);
btnConsultar.addEventListener("click", desplegarReporte);

function ingresarNuevoCaso() {
    let caso = document.getElementById("caso").value;
    caso = caso.replace(/\n/g, "").trim();
    const [profesoresCadena, actividadesCadena] = caso.split("--");
    const nombreProfesores = profesoresCadena.split (" ").map(nombre => nombre.trim());
    const actividadProfesores = actividadesCadena.split(";").map(actividad => actividad.trim());
    const profesores = {};

    nombreProfesores.forEach(nombre =>{
        profesores[nombre] = new Profesor(nombre, []);
    });

    actividadProfesores.forEach(actividad => {
        // Limpiar espacios adicionales en cada cita
        const actividadLimpia = actividad.trim();
        // Verificar si la cita es válida y tiene los elementos necesarios
        if (actividadLimpia) {
            const [nombre, inicio, fin, tipo] = actividadLimpia.split(" ");
            const profesorNombre = nombre.trim();
            if (profesores[profesorNombre]) {
                let suActividad = new Actividad(parseInt(inicio), parseInt(fin), tipo);
                profesores[profesorNombre].suActividad.push(suActividad);
            }
        }
    });

    info = profesores;
    salida.value = JSON.stringify(profesores, null, 2); // Muestra los datos de los profesores en formato JSON
}

function desplegarReporte(){
    salida.value = calcularLongestNaps(info);
}
