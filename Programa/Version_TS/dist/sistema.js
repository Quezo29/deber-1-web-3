import { juegos } from "./juegos.js";
// Devuelve una recomendación aleatoria y la muestra en la terminal.
export function recomendarJuego(lista = juegos) {
    if (!lista.length) {
        console.log("No hay juegos disponibles.");
        return null;
    }
    const juego = lista[Math.floor(Math.random() * lista.length)];
    console.log(`Recomendación: ${juego.nombre} (${juego.plataforma})`);
    return juego;
}
// Carga varias recomendaciones al mismo tiempo.
export async function cargarRecomendacionesEnParalelo(cantidad = 3) {
    return Promise.all(Array.from({ length: cantidad }, () => Promise.resolve().then(() => recomendarJuego())));
}
export function obtenerClasificacion(calificacion) {
    if (calificacion > 90)
        return "Excelente";
    if (calificacion > 70)
        return "Bueno";
    if (calificacion > 50)
        return "Mediocre";
    return "Malo";
}
export function mostrarClasificaciones(lista = juegos) {
    const orden = {
        Excelente: 1,
        Bueno: 2,
        Mediocre: 3,
        Malo: 4,
    };
    const resultado = lista
        .map((juego) => ({
        ...juego,
        clasificacion: obtenerClasificacion(juego.calificacion),
    }))
        .sort((a, b) => orden[a.clasificacion] - orden[b.clasificacion]);
    console.table(resultado.map(({ nombre, calificacion, clasificacion, genero, desarrollador }) => ({
        Juego: nombre,
        Genero: genero,
        Desarrollador: desarrollador,
        Calificación: calificacion,
        Clasificación: clasificacion,
    })));
    return resultado;
}
// Filtra y agrupa los juegos por consola para mostrar sus categorías.
export function filtrarPorConsola(lista = juegos) {
    const porConsola = lista.reduce((grupos, juego) => {
        if (!grupos[juego.plataforma])
            grupos[juego.plataforma] = [];
        grupos[juego.plataforma].push(juego);
        return grupos;
    }, {});
    Object.entries(porConsola).forEach(([consola, juegosDeConsola]) => {
        console.log(`\n${consola}:`);
        juegosDeConsola.forEach((juego) => console.log(`- ${juego.nombre} (${juego.año})`));
    });
    return porConsola;
}
