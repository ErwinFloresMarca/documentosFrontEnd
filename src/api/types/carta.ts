import { ComodinObject } from '../../types';
import { TipoCarta } from './tipo-carta';

export interface ICarta {
  id: number;
  numDoc: number;
  fechaRecepcion: string | Date;
  tipoCartasId: number;
  fileId?: number;
  campos: ComodinObject;
  estado: boolean;
  updatedAt: string | Date;
  createdAt: string | Date;

  tipoCarta?: TipoCarta;
  cartaEventos?: Array<any>;
}

export class Carta implements ICarta {
  id: number;

  numDoc: number;

  fechaRecepcion: string | Date;

  tipoCartasId: number;

  fileId?: number | undefined;

  campos: ComodinObject;

  estado: boolean;

  updatedAt: string | Date;

  createdAt: string | Date;

  tipoCarta?: TipoCarta | undefined;

  cartaEventos?: any[] | undefined;

  constructor(object: ICarta) {
    this.id = object.id;
    this.numDoc = object.numDoc;
    this.fechaRecepcion = object.fechaRecepcion;
    this.tipoCartasId = object.tipoCartasId;
    this.fileId = object.fileId;
    this.campos = object.campos;
    this.estado = object.estado;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
    this.tipoCarta = object.tipoCarta;
    this.cartaEventos = object.cartaEventos;
  }
}
