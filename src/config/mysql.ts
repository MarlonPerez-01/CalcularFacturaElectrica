import * as dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';
import logger from '../helpers/Logger';

export const pool = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER_DB,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	connectionLimit: 10,
});

export const promisePool = pool.promise();

export const connectDB = () => {
	pool.getConnection((error, connection) => {
		if (error) throw error;
		//TODO: capturar los errores más comunes

		promisePool.getConnection();

		logger.info('Database connection established');
		return;
	});
};
