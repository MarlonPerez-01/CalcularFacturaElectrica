export const PermitirAdmin = (req, res, next) => {
	try {
		const { usuario } = req.user;

		usuario.administrador ? next() : res.status(403).json({ message: 'No autorizado' });
	} catch (error) {
		res.status(403).json({ message: 'No autorizado' });
	}
};
