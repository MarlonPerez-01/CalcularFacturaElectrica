export interface IFacturaBase {
	id_factura?: number;
	id_usuario: number;
	correo?: string;
	id_distribuidor: number;
	kwh: number;
	multiplicador: number;
	dias_facturados: number;
	mes_facturado: string;
	tipo_uso: string;
	cargo_distribucion: number;
	cargo_comercializacion: number;
	cobro_desde: string;
	cobro_hasta: string;
	estado?: boolean;
}

export interface IFacturaPequeniaBase {
	id_factura_pequenia?: number;
	cargo_energia: number;
}

export interface IFacturaPequenia extends IFacturaBase, IFacturaPequeniaBase {}
