export function calcularLongestNaps(caso) {
    const resultados = [];
    // Iterar sobre cada profesor para calcular el nap más largo
    for (let nombre in caso) {
        const profesor = caso[nombre];
        // Ordenar las actividades del profesor y calcular el intervalo más largo (longest nap)
        profesor.suActividad.sort((a, b) => a.inicio - b.inicio);

        let longestNap = 0;
        let inicioLongestNap = 0;
        // Comienza desde el inicio del día
        let tiempoLibreInicio = 0;

        profesor.suActividad.forEach(actividad => {
            const siestaActual = actividad.inicio - tiempoLibreInicio;
            if (siestaActual > longestNap) {
                longestNap = siestaActual;
                inicioLongestNap = tiempoLibreInicio;
            }
            tiempoLibreInicio = actividad.fin;
        });
        // Revisar tiempo libre al final del día
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
    // Ordenar por duración y nombre
    resultados.sort((a, b) => b.duracion - a.duracion || a.nombre.localeCompare(b.nombre));
    // Formatear la salida
    return resultados
        .map(res => `${res.nombre} ${res.duracion} ${res.inicio}\n`)
        .join("\n");
}
