import { NextFunction, Request, Response } from 'express';
import Factura from '../models/Factura';
import FacturaPequenia from '../models/FacturaPequenia';
import { IFacturaPequenia } from '../types/Factura';
import { CalcularUsoResidencial } from '../functions/Pequenia/CalculosResidencial';
import { CalcularUsoGeneral } from '../functions/Pequenia/CalculosGeneral';
import createHttpError from 'http-errors';

const Crear = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const facturaPequenia: IFacturaPequenia = req.body;

		//Inserta todos los datos a la tabla Factura, excepto cargo_energia
		const { cargo_energia, correo, ...factura } = facturaPequenia;
		const { insertId: id_factura, affectedRows } = await Factura.Crear(factura);

		//Inserta en la tabla FacturaPequenia cargo_energia y tambien la referencia a Factura
		await FacturaPequenia.Crear({ id_factura, cargo_energia });

		if (affectedRows < 0) return next(createHttpError(500, { message: 'Registro no creado' }));

		//Verificar si es de uso general o residencial para calcular la factura
		let resultado =
			facturaPequenia.tipo_uso.toLowerCase() === 'residencial'
				? await CalcularUsoResidencial(facturaPequenia)
				: await CalcularUsoGeneral(facturaPequenia);

		return res.json({ msg: 'Registro creado', id: id_factura, resultado });
	} catch (error) {
		next(error);
	}
};

const ObtenerByNIC = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const facturas = await Factura.ObtenerByNIC(Number(id));

		return res.json({ msg: 'Datos obtenidos', facturas });
	} catch (error) {
		next(error);
	}
};

export default {
	Crear,
	ObtenerByNIC,
};
