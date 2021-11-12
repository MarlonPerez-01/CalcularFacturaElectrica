import { ParseDecimal } from '../../helpers/ParseDecimal';
import { ITotales } from '../../types/CalculosPequenia';
import { IFacturaPequenia } from '../../types/Factura';
import { ITarifaPequenia } from '../../types/TarifaPequenia';
import PequeniaDemanda from '../../models/PequeniaDemanda';
import {
	CalcularTotalMasIVa,
	CalcularTotalSegunFactura,
	ObtenerKwhPorPliego,
	SepararEnPliegos,
	ValidarTotal,
} from './Calculos';

export const CalcularUsoResidencial = async (factura: IFacturaPequenia) => {
	const { kwh } = factura;
	const bloque = EncontrarBloque(kwh);
	const tarifas: ITarifaPequenia[] = await ObtenerTarifas(factura, bloque);

	const pliegos = SepararEnPliegos(tarifas);

	const { totalEnergia, totalDistribucion } = CalcularEnergiaDistribucionPliegos(kwh, pliegos, factura);

	const totalComercializacion = CalcularComercializacion(kwh, factura, pliegos, tarifas);

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

//Encontrar el bloque al que pertenece segun los kwh consumidos
export const EncontrarBloque = (kwh: number): number => {
	let bloque = 0;

	if (kwh < 99) bloque = 1;
	if (kwh >= 100 && kwh <= 199) bloque = 2;
	if (kwh >= 200) bloque = 3;

	return bloque;
};

///Obtener las tarifas del pliego segun la factura ingresada
const ObtenerTarifas = async (factura: IFacturaPequenia, bloque: number) => {
	try {
		const tarifas: ITarifaPequenia[] = await PequeniaDemanda.ObtenerTarifaResidencial(
			factura.cobro_desde,
			factura.cobro_hasta,
			factura.id_distribuidor,
			bloque
		);

		return tarifas;
	} catch (error) {
		throw new Error('No se pudieron obtener las tarifas');
	}
};

//Calcular cargo de energia y cargo de distribucion
const CalcularEnergiaDistribucionPliegos = (
	kwh: number,
	pliegos: ITarifaPequenia[][],
	factura: IFacturaPequenia
): any => {
	const consumoPorDia: number = kwh / factura.dias_facturados;
	const kwhPliegos: number[] = pliegos.length === 2 ? ObtenerKwhPorPliego(factura, consumoPorDia) : [kwh];

	const totalPliegos = pliegos.map((pliego, index) => {
		//TODO: cambiar tipo any
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
	let kwhRestante = kwhPliego;

	//Bloque 1
	if (kwhPliego > 0) {
		if (kwhPliego < 100) {
			totalEnergia += kwhRestante * cargosEnergia[0];
			totalDistribucion += kwhRestante * cargosDistribucion[0];
		} else {
			totalEnergia += 99 * cargosEnergia[0];
			totalDistribucion += 99 * cargosDistribucion[0];
		}

		kwhRestante -= 99;
	}

	//Bloque 2
	if (kwhPliego > 99 && kwhPliego < 200) {
		if (kwhPliego < 199) {
			totalEnergia += kwhRestante * cargosEnergia[1];
			totalDistribucion += kwhRestante * cargosDistribucion[1];
		} else {
			totalEnergia += 100 * cargosEnergia[1];
			totalDistribucion += 100 * cargosDistribucion[1];
		}

		kwhRestante -= 100;
	}

	//Bloque 3
	if (kwhPliego > 199) {
		totalEnergia += kwhRestante * cargosEnergia[2];
		totalDistribucion += kwhRestante * cargosDistribucion[2];
	}

	return { totalEnergia, totalDistribucion };
};

//TODO: refactorizar esto en una unica funcion
//Obtener cargo de comercializacion segun el bloque y pliego
const CalcularComercializacion = (
	kwh: number,
	factura: IFacturaPequenia,
	pliegos: ITarifaPequenia[][],
	tarifas: ITarifaPequenia[]
): number => {
	const consumoPorDia: number = kwh / factura.dias_facturados; //no se que mejor nombre ponerle
	const kwhPliegos: number[] = pliegos.length === 2 ? ObtenerKwhPorPliego(factura, consumoPorDia) : [kwh];

	const bloques = kwhPliegos.map((kwh) => EncontrarBloque(kwh));

	const ComercializacionUnicoPliego = (tarifas: ITarifaPequenia[]) => {
		const bloqueFactura = EncontrarBloque(kwh);

		const { cargo_comercializacion } = tarifas.find((tarifa) => tarifa.bloque === bloqueFactura);

		return Number(cargo_comercializacion);
	};

	const ComercializacionVariosPliegos = () => {
		const cargosComercializacion = [];

		for (let i = 0; i < bloques.length; i++) {
			for (let j = 0; j < pliegos.length; j++) {
				if (bloques[i] == pliegos[i][j].bloque)
					cargosComercializacion.push(Number(pliegos[i][j].cargo_comercializacion));
			}
		}

		return cargosComercializacion.reduce((a: number, b: number) => a + b, 0) / cargosComercializacion.length;
	};

	const resultado =
		kwhPliegos.length > 1 ? ComercializacionVariosPliegos() : ComercializacionUnicoPliego(tarifas);

	return resultado;
};

export default {
	CalcularUsoResidencial,
};
