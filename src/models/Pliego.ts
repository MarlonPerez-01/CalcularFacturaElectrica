import { pool, promisePool } from '../config/mysql';
import { IPliego } from '../types/Pliego';

const Obtener = async () => {
	try {
		const query = `SELECT * FROM Pliego`;

		//@ts-ignore
		const [data]: [Array<IPliego>] = await promisePool.query(query);

		return data;
	} catch (error) {
		throw error;
	}
};

const ObtenerById = async (id: number) => {
	try {
		const query = `SELECT * FROM Distribuidor WHERE id_distribuidor = ${pool.escape(id)}`;

		const [data] = await promisePool.query(query);

		return data;
	} catch (error) {
		throw error;
	}
};

const ObtenerByFecha = async (id_distribuidor: number) => {
	try {
		const query = `SELECT * FROM Pliego WHERE id_distribuidor = ${pool.escape(id_distribuidor)}`;
		const [data] = await promisePool.query(query);

		return data;
	} catch (error) {
		throw error;
	}
};

export default {
	Obtener,
	ObtenerById,
	ObtenerByFecha,
};
