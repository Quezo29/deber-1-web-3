export type Calificacion = "Excelente" | "Bueno" | "Mediocre" | "Malo";

export interface Juego {
	nombre: string;
	genero: string;
	desarrollador: string;
	plataforma: string;
	calificacion: number;
	año: number;
}