import { NextFunction, Request, Response } from 'express';
import { IFacturaPequenia, IFacturaBase } from '../types/Factura';
import { pool, promisePool } from '../config/mysql';
import { OkPacket } from 'mysql2';
import { IParams, paramsId } from '../types/Params';

//TODO: agregar tipo de dato retornado
const Obtener = async () => {
	try {
		const query = `SELECT * FROM Factura WHERE estado = 1`;
		const [data] = await promisePool.query(query);

		return data;
	} catch (error) {
		throw error;
	}
};

const Crear = async (facturaPequenia: { id_factura: number; cargo_energia: number }) => {
	try {
		const query = `INSERT INTO FacturaPequenia SET ?`;

		const [data] = await promisePool.query(query, facturaPequenia);

		return <OkPacket>data;
	} catch (error) {
		throw error;
	}
};

export default {
	Obtener,
	Crear,
};
