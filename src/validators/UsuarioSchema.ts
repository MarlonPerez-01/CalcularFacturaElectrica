import * as Yup from 'yup';

export const usuarioLogin = Yup.object({
	body: Yup.object({
		correo: Yup.string().email().required(),
		contrasenia: Yup.string().required(),
	}),
});

export const usuarioSignup = usuarioLogin.shape({
	body: Yup.object({
		id_usuario: Yup.number().positive().required(),
	}),
});
