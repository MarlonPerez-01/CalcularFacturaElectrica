import { format } from 'date-fns';

//TODO: revisar el tipo de dato recibido por parametro
//Convertir las fechas a un formato aceptado por el tipo date de mysql

export const parseDateMysql = (fecha: string) => format(new Date(fecha), 'yyyy-MM-dd');
