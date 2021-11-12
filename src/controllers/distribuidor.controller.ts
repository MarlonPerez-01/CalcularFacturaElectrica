import { NextFunction, Request, Response } from 'express';
import Distribuidor from '../models/Distribuidor';

const Obtener = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await Distribuidor.Obtener();

		return res.json({ msg: 'Datos obtenidos', data });
	} catch (error) {
		next(error);
	}
};

export default {
	Obtener,
};
