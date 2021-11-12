import { Application } from 'express';

import Validar from '../middlewares/Validacion';
import ValidarToken from '../middlewares/ValidarToken';
import { PermitirAdmin } from '../middlewares/Autorizacion';
import PequeniaDemanda from '../controllers/pequenia.demanda.controller';
import { pequeniaDemanda } from '../validators/PequeniaDemandaSchema';

const AuthRoutes = (app: Application): void => {
	app.post('/pequenia-demanda', ValidarToken, PermitirAdmin, Validar(pequeniaDemanda), PequeniaDemanda.Crear);
	app.get('/pequenia-demanda', PequeniaDemanda.Obtener);
};

export default AuthRoutes;
