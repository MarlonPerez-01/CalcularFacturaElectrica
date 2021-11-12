import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const ValidarToken = (req: Request, res: Response, next: NextFunction) => {
	//obtener token
	const token = req.header('x-auth-token');

	//validar que exista token
	if (!token) return res.status(401).json({ msg: 'No hay token en la petición' });

	try {
		//se decodifica y se pasa el token mediante req.user
		const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
		//@ts-ignore
		req.user = decoded;

		next();
	} catch (err) {
		if (err instanceof TokenExpiredError) {
			return res.status(401).send({ msg: 'El token ha expirado' });
		}

		res.status(401).json({ msg: 'Access token inválido' });
	}
};

export default ValidarToken;
