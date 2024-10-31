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

    const [profesoresCadena, citasCadena] = caso.split("--");
    const nombreProfesores = profesoresCadena.split (" ").map(nombre => nombre.replace(/['"]/g, "").trim());
    const citasProfesores = citasCadena.split(";");

    const profesores = {};

    nombreProfesores.forEach(nombre =>{
        profesores[nombre] = new Profesor(nombre, []);
    });

    citasProfesores.forEach(cita => {
        // Limpiar espacios adicionales en cada cita
        const citaLimpia = cita.trim();
        
        // Verificar si la cita es válida y tiene los elementos necesarios
        if (citaLimpia) {
            const [nombre, inicio, fin, tipo] = citaLimpia.split(" ");
            const profesorNombre = nombre.replace(/['"]/g, "").trim();
            if (profesores[profesorNombre]) {
                const suActividad = new Actividad(parseInt(inicio), parseInt(fin), tipo);
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

// function listarProfesores(bd) {
//     let lista;
//     bd.forEach(profesores => {
//         lista = profesores.toString();
//     });
//     return lista;
// }



