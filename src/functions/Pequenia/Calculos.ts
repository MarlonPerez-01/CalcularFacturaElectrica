import { getDate } from 'date-fns';
import { IVA } from '../../constants/constants';
import { ITotales } from '../../types/CalculosPequenia';
import { IFacturaPequenia } from '../../types/Factura';
import { ITarifaPequenia } from '../../types/TarifaPequenia';

//Separar las tarifas en los pliegos correspondientes
export const SepararEnPliegos = (tarifas: ITarifaPequenia[]) => {
	const pliegos = tarifas.reduce((pliego, tarifa: ITarifaPequenia) => {
		(pliego[tarifa.id_pliego] = pliego[tarifa.id_pliego] || []).push(tarifa);

		return <Array<ITarifaPequenia>>pliego;
	}, {});

	return <Array<Array<ITarifaPequenia>>>Object.values(pliegos);
};

//Obtener kwh correspondiente a cada pliego
export const ObtenerKwhPorPliego = (factura: IFacturaPequenia, consumoPorDia: number): number[] => {
	const diasPliegos: number[] = [];

	diasPliegos[0] = factura.dias_facturados - getDate(new Date(factura.cobro_desde));
	diasPliegos[1] = factura.dias_facturados - diasPliegos[0];

	return diasPliegos.map((diaPliego) => diaPliego * consumoPorDia);
};

//Calcular total y agregar IVA
export const CalcularTotalMasIVa = (totales: ITotales): number =>
	parseFloat(((totales.energia + totales.distribucion + totales.comercializacion) * IVA).toFixed(2));

//Calcula el total de los tres cargos indicados en factura
export const CalcularTotalSegunFactura = (factura: IFacturaPequenia): number =>
	parseFloat(
		(factura.cargo_distribucion + factura.cargo_comercializacion + factura.cargo_energia).toFixed(2)
	);

//Valida que el total calculado y el total segun factura sean iguales
export const ValidarTotal = (totalFactura: number, totalCalculado: number): boolean =>
	totalFactura === totalCalculado ? true : false;
