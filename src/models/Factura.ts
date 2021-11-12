import { NextFunction, Request, Response } from 'express';
import { IFacturaBase, IFacturaPequenia } from '../types/Factura';
import { pool, promisePool } from '../config/mysql';
import { OkPacket } from 'mysql2';

const ObtenerByNIC = async (id: number): Promise<Array<IFacturaPequenia>> => {
	try {
		const query = `
    select f.id_factura,
       f.kwh,
       f.multiplicador,
       f.dias_facturados,
       f.mes_facturado,
       f.tipo_uso,
       f.cargo_distribucion,
       f.cargo_comercializacion,
       f.cobro_desde,
       f.cobro_hasta,
       d.nombre AS distribuidor
    from Factura as f
            inner join Distribuidor d on f.id_distribuidor = d.id_distribuidor
    where id_usuario = ${id} AND estado = 1;`;

		//@ts-ignore
		const [data]: [Array<IFacturaPequenia>] = await promisePool.query(query);

		return data;
	} catch (error) {
		throw error;
	}
};

const Crear = async (factura: IFacturaBase) => {
	try {
		const query = `INSERT INTO Factura SET ?`;

		const [data] = await promisePool.query(query, factura);

		return <OkPacket>data;
	} catch (error) {
		throw error;
	}
};

export default {
	ObtenerByNIC,
	Crear,
};
