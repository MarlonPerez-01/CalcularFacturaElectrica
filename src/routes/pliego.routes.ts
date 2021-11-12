import { Application } from 'express';
import Pliego from '../controllers/pliego.controller';

const AuthRoutes = (app: Application): void => {
	app.get('/pliegos', Pliego.Obtener);
};

export default AuthRoutes;
