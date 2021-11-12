export interface IUsuario {
	id_usuario: number;
	correo: string;
	contrasenia: string;
	administrador: boolean;
	estado?: boolean;
}
