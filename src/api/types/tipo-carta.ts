import { IArea } from './area';

export interface ITipoCarta {
  id: number;
  nombre: string;
  estado: boolean;
  updatedAt: string | Date;
  createdAt: string | Date;

  areas: Array<IArea>;
  cartas: Array<any>;
  campos: Array<any>;
}

export class TipoCarta implements ITipoCarta {
  id: number;

  nombre: string;

  estado: boolean;

  updatedAt: string | Date;

  createdAt: string | Date;

  areas: Array<IArea>;

  cartas: Array<any>;

  campos: Array<any>;

  constructor(object: ITipoCarta) {
    this.id = object.id;
    this.nombre = object.nombre;
    this.estado = object.estado;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
    this.areas = object.areas;
    this.cartas = object.cartas;
    this.campos = object.campos;
  }
}
