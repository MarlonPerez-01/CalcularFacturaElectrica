import { Application } from 'express';
import Distribuidor from '../controllers/distribuidor.controller';

const AuthRoutes = (app: Application): void => {
	app.get('/distribuidores', Distribuidor.Obtener);
};

export default AuthRoutes;
