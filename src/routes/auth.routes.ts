import { Application } from 'express';
import Auth from '../controllers/auth.controller';

const AuthRoutes = (app: Application): void => {
	app.post('/auth/login', Auth.Login);
	app.post('/auth/signup', Auth.Signup);
};

export default AuthRoutes;
