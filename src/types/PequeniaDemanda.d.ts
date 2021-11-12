export interface IPequeniaDemanda {
	id_pequenia?: number;
	id_distribuidor: number;
	bloque: number;
	cargo_energia: number;
	cargo_distribucion: number;
	cargo_comercializacion: number;
	tipo_uso: 'residencial' | 'general';
}
