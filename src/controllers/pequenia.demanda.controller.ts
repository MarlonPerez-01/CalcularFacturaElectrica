import { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';
import PequeniaDemanda from '../models/PequeniaDemanda';
import { IPequeniaDemanda } from '../types/PequeniaDemanda';

const Crear = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const pequeniaDemanda: IPequeniaDemanda = req.body;

		//TODO: validar que exista el pliego y el distribuidor
		const { insertId, affectedRows } = await PequeniaDemanda.Crear(pequeniaDemanda);

		if (affectedRows < 0) return next(createHttpError(500, { message: 'Registro no creado' }));

		return res.json({ msg: 'Registro creado', id: insertId });
	} catch (error) {
		next(error);
	}
};

const Obtener = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await PequeniaDemanda.ObtenerTarifas();

		return res.json({ msg: 'Datos obtenidos', data });
	} catch (error) {
		next(error);
	}
};

export default {
	Crear,
	Obtener,
};
