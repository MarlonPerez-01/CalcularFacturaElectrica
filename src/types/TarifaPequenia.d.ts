import { RowDataPacket } from 'mysql2';
import { IPequeniaDemanda } from './PequeniaDemanda';
import { IPliego } from './Pliego';

export interface ITarifaPequenia extends IPliego, IPequeniaDemanda {}
