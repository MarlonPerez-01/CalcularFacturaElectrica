import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import Auth from '../models/Auth';

const ValidarCorreo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id_usuario, correo } = req.body;
		const match = await Auth.ObtenerByCorreoNIC(id_usuario, correo);
		match.length > 0 ? next() : res.status(422).json({ msg: 'El NIC no coincide con el correo' });
	} catch (err) {
		throw err;
	}
};

export default ValidarCorreo;
