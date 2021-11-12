import * as Yup from 'yup';

export const factura = Yup.object({
	body: Yup.object({
		id_usuario: Yup.number().positive().required(),
		id_distribuidor: Yup.number().positive().required(),
		correo: Yup.string().email().required(),
		kwh: Yup.number().positive().required(),
		multiplicador: Yup.number().positive().required(),
		dias_facturados: Yup.number().positive().required(),
		mes_facturado: Yup.date().required(),
		tipo_uso: Yup.string().required(),
		cargo_distribucion: Yup.number().positive().required(),
		cargo_comercializacion: Yup.number().positive().required(),
		cargo_energia: Yup.number().positive().required(),
		cobro_desde: Yup.date().required(),
		cobro_hasta: Yup.date().required(),
	}),
});

//TODO: Yup.date() no valida como se espera, permite el ingreso de numeros
