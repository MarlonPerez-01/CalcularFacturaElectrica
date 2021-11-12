import { IVA } from '../../constants/constants';
import PequeniaDemanda from '../../models/PequeniaDemanda';
import { ITotales } from '../../types/CalculosPequenia';
import { IFacturaPequenia } from '../../types/Factura';
import { ITarifaPequenia } from '../../types/TarifaPequenia';
import {
	CalcularTotalMasIVa,
	CalcularTotalSegunFactura,
	ObtenerKwhPorPliego,
	SepararEnPliegos,
	ValidarTotal,
} from './Calculos';

export const CalcularUsoGeneral = async (factura: IFacturaPequenia) => {
	const { kwh } = factura;
	const tarifas: ITarifaPequenia[] = await ObtenerTarifas(factura);
	const pliegos = SepararEnPliegos(tarifas);

	// const { totalDistribucion, totalEnergia } = CalcularEnergiaDistribucion(kwh, tarifas);
	const { totalEnergia, totalDistribucion } = CalcularEnergiaDistribucionPliegos(kwh, pliegos, factura);
	const totalComercializacion = CalcularComercializacion(tarifas);

	const totales: ITotales = {
		comercializacion: totalComercializacion,
		distribucion: totalDistribucion,
		energia: totalEnergia,
	};

	const totalCalculado = CalcularTotalMasIVa(totales);
	const totalFactura = CalcularTotalSegunFactura(factura);
	const totalCoincide = ValidarTotal(totalFactura, totalCalculado);

	return { totalCalculado, totalFactura, totalCoincide };
};

///Obtener las tarifas del pliego segun la factura ingresada
async function ObtenerTarifas(factura: IFacturaPequenia) {
	try {
		const tarifas: ITarifaPequenia[] = await PequeniaDemanda.ObtenerTarifaGeneral(
			factura.cobro_desde,
			factura.cobro_hasta,
			factura.id_distribuidor
		);
		return tarifas;
	} catch (error) {
		throw new Error('No se pudieron obtener las tarifas');
	}
}

//Calcular cargo de energia y cargo de distribucion
const CalcularEnergiaDistribucion = (
	kwh: number,
	tarifas: ITarifaPequenia[]
): { totalEnergia: number; totalDistribucion: number } => {
	let totalEnergia = 0;
	let totalDistribucion = 0;

	const cargosEnergia = [];
	const cargosDistribucion = [];

	tarifas.map((tarifa) => cargosEnergia.push(tarifa.cargo_energia));
	tarifas.map((tarifa) => cargosDistribucion.push(tarifa.cargo_distribucion));

	//Siempre sera bloque 0
	totalEnergia += kwh * cargosEnergia[0];
	totalDistribucion += kwh * cargosDistribucion[0];

	return { totalEnergia, totalDistribucion };
};

//Calcular cargo de energia y cargo de distribucion
const CalcularEnergiaDistribucionPliegos = (
	kwh: number,
	pliegos: ITarifaPequenia[][],
	factura: IFacturaPequenia
): any => {
	const consumoPorDia: number = kwh / factura.dias_facturados; //no se que mejor nombre ponerle
	const kwhPliegos: number[] = pliegos.length === 2 ? ObtenerKwhPorPliego(factura, consumoPorDia) : [kwh];

	const totalPliegos = pliegos.map((pliego, index) => {
		//TODO: cambiar el tipo any
		const cargos = pliego.reduce((cargos, tarifa): any => {
			if (!cargos['energia']) cargos['energia'] = [];
			cargos['energia'].push(Number(tarifa.cargo_energia));

			if (!cargos['distribucion']) cargos['distribucion'] = [];
			cargos['distribucion'].push(Number(tarifa.cargo_distribucion));

			return cargos;
		}, []);

		const { totalDistribucion, totalEnergia } = CalcularEnergiaDistribucionNuevo(
			kwhPliegos[index],
			cargos.energia,
			cargos.distribucion
		);

		return { totalEnergia, totalDistribucion };
	});

	const total: { totalEnergia: number; totalDistribucion: number } = totalPliegos.reduce(
		(total, item) => {
			total.totalEnergia += Number(item.totalEnergia);
			total.totalDistribucion += Number(item.totalDistribucion);

			return total;
		},
		{ totalEnergia: 0, totalDistribucion: 0 }
	);

	return total;
};

//Calcular cargo de energia y cargo de distribucion
const CalcularEnergiaDistribucionNuevo = (
	kwhPliego: number,
	cargosEnergia: number[],
	cargosDistribucion: number[]
) => {
	let totalEnergia = 0;
	let totalDistribucion = 0;

	totalEnergia += kwhPliego * cargosEnergia[0];
	totalDistribucion += kwhPliego * cargosDistribucion[0];

	return { totalEnergia, totalDistribucion };
};

//Obtener cargo de comercializacion de bloque 0 (uso general)
const CalcularComercializacion = (tarifas: ITarifaPequenia[]): number => {
	const cargosComercializacion = tarifas.map(({ cargo_comercializacion }) => Number(cargo_comercializacion));
	return cargosComercializacion.reduce((a: number, b: number) => a + b, 0) / cargosComercializacion.length;
};

export default {
	CalcularUsoGeneral,
};
