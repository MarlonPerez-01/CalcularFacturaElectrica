import { Request, Response, NextFunction } from 'express';

const Validar = (schema) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await schema.validate(
			{ body: req.body, query: req.query, params: req.params },
			{ abortEarly: false }
		);

		return next();
	} catch (err) {
		const { errors } = err;
		res.status(422).json({ msg: errors });
	}
};

export default Validar;
