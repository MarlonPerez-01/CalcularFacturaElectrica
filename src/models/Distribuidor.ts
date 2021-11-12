import { pool, promisePool } from '../config/mysql';

const Obtener = async () => {
  try {
    const query = `SELECT * FROM Distribuidor`;
    const [data] = await promisePool.query(query);

    return data;
  } catch (error) {
    throw error;
  }
};

const ObtenerById = async (id: number) => {
  try {
    const query = `SELECT * FROM Distribuidor WHERE id_distribuidor = ${pool.escape(
      id
    )}`;
    const [data] = await promisePool.query(query);

    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  Obtener,
  ObtenerById,
};
