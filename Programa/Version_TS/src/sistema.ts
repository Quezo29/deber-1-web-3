import { juegos } from "./juegos.js";
import { Calificacion, Juego } from "./tipos.js";

// Devuelve una recomendación aleatoria y la muestra en la terminal.
export function recomendarJuego(lista: Juego[] = juegos): Juego | null {
	if (!lista.length) {
		console.log("No hay juegos disponibles.");
		return null;
	}

	const juego = lista[Math.floor(Math.random() * lista.length)];
	console.log(`Recomendación: ${juego.nombre} (${juego.plataforma})`);
	return juego;
}

// Carga varias recomendaciones al mismo tiempo.
export async function cargarRecomendacionesEnParalelo(
	cantidad = 3
): Promise<(Juego | null)[]> {
	return Promise.all(
		Array.from({ length: cantidad }, () =>
			Promise.resolve().then(() => recomendarJuego())
		)
	);
}

export function obtenerClasificacion(calificacion: number): Calificacion {
	if (calificacion > 90) return "Excelente";
	if (calificacion > 70) return "Bueno";
	if (calificacion > 50) return "Mediocre";
	return "Malo";
}

export function mostrarClasificaciones(lista: Juego[] = juegos) {
	const orden: Record<Calificacion, number> = {
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

	console.table(
		resultado.map(({ nombre, calificacion, clasificacion, genero, desarrollador }) => ({
			Juego: nombre,
			Genero: genero,
			Desarrollador: desarrollador,
			Calificación: calificacion,
			Clasificación: clasificacion,
		}))
	);
	return resultado;
}

// Filtra y agrupa los juegos por consola para mostrar sus categorías.
export function filtrarPorConsola(lista: Juego[] = juegos): Record<string, Juego[]> {
	const porConsola = lista.reduce<Record<string, Juego[]>>((grupos, juego) => {
		if (!grupos[juego.plataforma]) grupos[juego.plataforma] = [];
		grupos[juego.plataforma].push(juego);
		return grupos;
	}, {});

	Object.entries(porConsola).forEach(([consola, juegosDeConsola]) => {
		console.log(`\n${consola}:`);
		juegosDeConsola.forEach((juego) =>
			console.log(`- ${juego.nombre} (${juego.año})`)
		);
	});

	return porConsola;
}
