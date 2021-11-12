import * as Yup from 'yup';

export const paginacion = Yup.object({
	desde: Yup.number().positive().default(0),
	limite: Yup.number().positive().max(25).default(10),
});
