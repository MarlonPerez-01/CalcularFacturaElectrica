import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import Auth from '../models/Auth';
import { IUsuario } from '../types/Usuario';
import { GenerarAccessToken } from '../helpers/Tokens';

const Login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const usuario: IUsuario = req.body;
		const usuarioDB = await Auth.ObtenerByCorreo(usuario.correo);

		const match: boolean = bcrypt.compareSync(
			usuario.contrasenia.toString(),
			usuarioDB.contrasenia.toString().toString()
		);

		if (!match) return next(createHttpError(422, { message: `Credenciales inválidas` }));

		const accessToken = GenerarAccessToken(usuarioDB.id_usuario, usuarioDB.correo, usuarioDB.administrador);

		return res.json({ msg: 'Credenciales validas', accessToken });
	} catch (error) {
		next(error);
	}
};

const Signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const usuario: IUsuario = req.body;

		const existeUsuarioNIC = await Auth.ObtenerByNIC(usuario.id_usuario);

		if (existeUsuarioNIC)
			return next(
				createHttpError(422, { message: `Ya existe un usuario con el NIC: ${usuario.id_usuario}` })
			);

		const existeUsuarioCorreo = await Auth.ObtenerByCorreo(usuario.correo);

		if (existeUsuarioCorreo)
			return next(createHttpError(422, { message: `Ya existe un usuario con el correo: ${usuario.correo}` }));

		usuario.administrador = false; //TODO: colocar false por default en la db

		//TODO: crear una funcion para hashear contrasenias
		const hash = bcrypt.hashSync(usuario.contrasenia.toString(), 5);
		usuario.contrasenia = hash;

		const { affectedRows } = await Auth.Signup(usuario);

		if (affectedRows < 0) return next(createHttpError(500, { message: 'Registro no creado' }));

		const accessToken = GenerarAccessToken(usuario.id_usuario, usuario.correo, usuario.administrador);

		return res.json({ msg: 'Usuario registrado', accessToken });
	} catch (error) {
		next(error);
	}
};

export default {
	Login,
	Signup,
};
