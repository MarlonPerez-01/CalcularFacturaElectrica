import jwt from 'jsonwebtoken';

export const GenerarAccessToken = (id_usuario: number, correo: string, administrador: boolean): string => {
	try {
		const payload = { usuario: { id_usuario, correo, administrador } };
		return jwt.sign(payload, process.env.JWT_SECRET_ACCESS, { expiresIn: '7d' });
	} catch (error) {
		throw error;
	}
};
