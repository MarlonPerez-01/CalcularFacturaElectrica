import dotenv from 'dotenv';
import { connectDB } from '../config/mysql';

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import ErrorHandler from '../middlewares/ErrorHandler';
import logger from '../helpers/Logger';
import NotFound from '../middlewares/NotFound';
import helmet from 'helmet';
import FacturaRoutes from '../routes/factura.routes';
import DistribuidorRoutes from '../routes/distribuidor.routes';
import PliegoRoutes from '../routes/pliego.routes';
import PequeniaDemandaRoutes from '../routes/pequenia.demanda.routes';
import AuthRoutes from '../routes/auth.routes';

class Server {
	public app: Application;
	private port: number;

	constructor() {
		dotenv.config({ path: './.env' });
		this.port = parseInt(process.env.PORT!) || 8080;
		this.app = express();
		this.conexionDB();
		this.middlewares();
		this.routes();

		this.app.use(ErrorHandler);

		this.app.use(NotFound);
	}

	public listen(): void {
		this.app
			.listen(this.port, () => {
				logger.info(`Server running on port ${this.port}`);
			})
			.on('error', (error) => {
				logger.error(error);
				process.exit(1);
			});
	}

	private conexionDB(): void {
		connectDB();
	}

	private middlewares(): void {
		this.app.use(helmet());
		this.app.use(
			cors({
				origin: 'http://localhost:3000',
				methods: ['GET', 'POST'],
				allowedHeaders: ['Content-Type', 'x-auth-token'],
			})
		);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(morgan('dev'));
	}

	private routes(): void {
		FacturaRoutes(this.app);
		DistribuidorRoutes(this.app);
		PliegoRoutes(this.app);
		PequeniaDemandaRoutes(this.app);
		AuthRoutes(this.app);
	}
}

export default Server;
