import { Response, Request, NextFunction } from 'express';

const NotFound = (req: Request, res: Response, next: NextFunction) =>
	res.status(404).json({ msg: 'Ruta no encontrada' });

export default NotFound;
