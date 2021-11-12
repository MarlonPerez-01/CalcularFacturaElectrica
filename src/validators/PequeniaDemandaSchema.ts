import * as Yup from 'yup';

export const pequeniaDemanda = Yup.object({
	body: Yup.object({
		id_pliego: Yup.number().positive().required(),
		id_distribuidor: Yup.number().positive().required(),
		bloque: Yup.number().min(0).required(),
		cargo_energia: Yup.number().positive().required(),
		cargo_distribucion: Yup.number().positive().required(),
		cargo_comercializacion: Yup.number().positive().required(),
		tipo_demanda: Yup.string().required(),
	}),
});
