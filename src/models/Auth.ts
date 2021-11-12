import { OkPacket } from 'mysql2';
import { pool, promisePool } from '../config/mysql';
import { IFacturaPequenia } from '../types/Factura';
import { IUsuario } from '../types/Usuario';

const ObtenerByNIC = async (id_usuario: number) => {
	try {
		const query = `SELECT * FROM Usuario WHERE id_usuario = '${pool.escape(id_usuario)}';`;

		const [data] = await promisePool.query(query);
		return <IUsuario>data[0];
	} catch (error) {
		throw error;
	}
};

const ObtenerByCorreo = async (correo: string) => {
	try {
		const query = `SELECT * FROM Usuario WHERE correo = '${correo}';`;

		const [data] = await promisePool.query(query);
		return <IUsuario>data[0];
	} catch (error) {
		throw error;
	}
};

const ObtenerByCorreoNIC = async (id: number, correo: string): Promise<Array<IFacturaPequenia>> => {
	try {
		const query = `SELECT * FROM Usuario WHERE id_usuario = ${id} AND correo = '${correo}';`;

		//@ts-ignore
		const [data]: [Array<IFacturaPequenia>] = await promisePool.query(query);

		return data;
	} catch (error) {
		throw error;
	}
};

const Signup = async (usuario: IUsuario) => {
	try {
		const query = `INSERT INTO Usuario SET ?;`;

		const [data] = await promisePool.query(query, usuario);
		return <OkPacket>data;
	} catch (error) {
		throw error;
	}
};

export default {
	ObtenerByNIC,
	ObtenerByCorreo,
	ObtenerByCorreoNIC,
	Signup,
};
