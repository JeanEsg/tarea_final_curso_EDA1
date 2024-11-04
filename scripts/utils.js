export function calcularLongestNaps(caso) {
    const resultados = [];
    // Iterar sobre cada profesor para calcular el nap mas largo
    for (let nombre in caso) {
        const profesor = caso[nombre];

        // Verificar que el profesor tiene actividades
        if (!Array.isArray(profesor.suActividad) || profesor.suActividad.length === 0) {
            resultados.push({
                nombre: profesor.nombre,
                duracion: 1440, // Marca como libre todo el dia si no tiene actividades
                inicio: 0,
            });
            continue;
        }
        // Ordenar las actividades del profesor y calcular el intervalo mas largo
        profesor.suActividad.sort((a, b) => a.inicio - b.inicio);

        let longestNap = 0;
        let inicioLongestNap = 0;
        // Comienza desde el inicio del dia
        let tiempoLibreInicio = 0;

        profesor.suActividad.forEach(actividad => {
            const siestaActual = actividad.inicio - tiempoLibreInicio;
            if (siestaActual > longestNap) {
                longestNap = siestaActual;
                inicioLongestNap = tiempoLibreInicio;
            }
            tiempoLibreInicio = actividad.fin;
        });
        // Revisar tiempo libre al final del dia
        const siestaFinal = 1440 - tiempoLibreInicio;
        if (siestaFinal > longestNap) {
            longestNap = siestaFinal;
            inicioLongestNap = tiempoLibreInicio;
        }
        // Añadir resultado para cada profesor
        resultados.push({
            nombre: profesor.nombre,
            duracion: longestNap,
            inicio: inicioLongestNap,
        });
    }
    // Ordenar por duracion y nombre
    resultados.sort((a, b) => b.duracion - a.duracion || a.nombre.localeCompare(b.nombre));
    // Organizar la salida
    return resultados
        .map(res => `${res.nombre} ${res.duracion} ${res.inicio}\n`)
        .join("\n");
}
