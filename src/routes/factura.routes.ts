import { Application } from 'express';
import { factura } from '../validators/FacturaSchema';

import Validar from '../middlewares/Validacion';
import Factura from '../controllers/factura.pequenia.controller';
import ValidarCorreo from '../middlewares/ValidarCorreo';
import ValidarToken from '../middlewares/ValidarToken';
import { PermitirAdmin } from '../middlewares/Autorizacion';

const AuthRoutes = (app: Application): void => {
	app.get('/facturas/:id', ValidarToken, Factura.ObtenerByNIC);
	app.post('/facturas', ValidarToken, PermitirAdmin, Validar(factura), ValidarCorreo, Factura.Crear);
};

export default AuthRoutes;
