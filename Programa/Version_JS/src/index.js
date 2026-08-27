import { recomendarJuego, mostrarClasificaciones, filtrarPorConsola, cargarRecomendacionesEnParalelo } from './sistema.js';


async function main() {
console.log("\n=== Clasificación por calificación ===");
mostrarClasificaciones();
console.log("\n=== Juegos por consola ===");
filtrarPorConsola();
console.log("=== Recomendación aleatoria ===");
recomendarJuego();
console.log("\n=== Recomendaciones en paralelo ===");
cargarRecomendacionesEnParalelo();
}

main();
