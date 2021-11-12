import { NextFunction, Request, Response } from 'express';
import Pliego from '../models/Pliego';

const Obtener = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await Pliego.Obtener();

		return res.json({ msg: 'Datos obtenidos', data });
	} catch (error) {
		next(error);
	}
};

export default {
	Obtener,
};
