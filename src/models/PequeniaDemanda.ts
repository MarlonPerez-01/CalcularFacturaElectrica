import { OkPacket } from 'mysql2';
import { pool, promisePool } from '../config/mysql';
import { IPequeniaDemanda } from '../types/PequeniaDemanda';
import { ITarifaPequenia } from '../types/TarifaPequenia';

//Obtener la tarifa residencial establecida en el pliego segun la fecha facturada y bloque
const ObtenerTarifaResidencial = async (
	fechaInicio: string,
	fechaCaduca: string,
	idDistribuidor: number,
	bloque: number
): Promise<Array<ITarifaPequenia>> => {
	try {
		const query = `
      SELECT *
      FROM Pliego as p
      INNER JOIN PequeniaDemanda pd on p.id_pliego = pd.id_pliego
      WHERE pd.id_distribuidor = ${idDistribuidor}
      AND pd.bloque > 0
      AND pd.bloque <= ${bloque}
      AND ('${fechaInicio}' BETWEEN p.fecha_inicio AND p.fecha_caduca
      OR '${fechaCaduca}' BETWEEN p.fecha_inicio AND p.fecha_caduca);
    `;

		//@ts-ignore
		const [data]: [Array<ITarifaPequenia>] = await promisePool.query(query);
		return data;
	} catch (error) {
		throw error;
	}
};

//Obtener la tarifa general establecida en el pliego segun la fecha facturada y bloque
const ObtenerTarifaGeneral = async (
	fechaInicio: string,
	fechaCaduca: string,
	idDistribuidor: number
): Promise<Array<ITarifaPequenia>> => {
	try {
		const query = `
    SELECT *
      FROM Pliego as p
      INNER JOIN PequeniaDemanda pd on p.id_pliego = pd.id_pliego
      WHERE pd.id_distribuidor = ${idDistribuidor}
      AND pd.bloque = 0
      AND ('${fechaInicio}' BETWEEN p.fecha_inicio AND p.fecha_caduca
      OR '${fechaCaduca}' BETWEEN p.fecha_inicio AND p.fecha_caduca);
    `;

		//@ts-ignore
		const [data]: [Array<ITarifaPequenia>] = await promisePool.query(query);
		return data;
	} catch (error) {
		throw error;
	}
};

//Crear tarifa de pequeña demanda
const Crear = async (pequeniaDemanda: IPequeniaDemanda) => {
	try {
		const query = `INSERT INTO PequeniaDemanda SET ?`;

		const [data] = await promisePool.query(query, pequeniaDemanda);

		return <OkPacket>data;
	} catch (error) {
		throw error;
	}
};

//Obtener tarifas
const ObtenerTarifas = async () => {
	try {
		const query = `
    SELECT
      pd.id_pequenia, 
      pd.bloque, 
      pd.cargo_energia, 
      pd.cargo_comercializacion, 
      pd.cargo_distribucion, 
      pd.tipo_demanda, 
      p.fecha_inicio, 
      p.fecha_caduca, 
      d.nombre as distribuidor 
    FROM 
      PequeniaDemanda pd 
      inner join Pliego p on pd.id_pliego = p.id_pliego 
      inner join Distribuidor d on pd.id_distribuidor = d.id_distribuidor;
    `;

		//@ts-ignore
		const [data]: [Array<ITarifaPequenia>] = await promisePool.query(query);
		return data;
	} catch (error) {
		throw error;
	}
};

export default {
	ObtenerTarifas,
	ObtenerTarifaResidencial,
	ObtenerTarifaGeneral,
	Crear,
};
