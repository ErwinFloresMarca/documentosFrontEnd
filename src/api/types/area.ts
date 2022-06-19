export interface IArea {
  id: number;
  nombre: string;
  updatedAt: string | Date;
  createdAt: string | Date;

  tiposCartas: Array<any>;
  cartas: Array<any>;
  responsables: Array<any>;
}

export class Area implements IArea {
  id: number;

  nombre: string;

  updatedAt: string | Date;

  createdAt: string | Date;

  tiposCartas: Array<any>;

  cartas: Array<any>;

  responsables: Array<any>;

  constructor(object: IArea) {
    this.id = object.id;
    this.nombre = object.nombre;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
    this.tiposCartas = object.tiposCartas;
    this.cartas = object.cartas;
    this.responsables = object.responsables;
  }
}
