import { IArea } from './area';

export interface ITipoDocumento {
  id: number;
  nombre: string;
  estado: boolean;
  updatedAt: string | Date;
  createdAt: string | Date;

  areas: Array<IArea>;
  documentos: Array<any>;
  campos: Array<any>;
}

export class TipoDocumento implements ITipoDocumento {
  id: number;

  nombre: string;

  estado: boolean;

  updatedAt: string | Date;

  createdAt: string | Date;

  areas: Array<IArea>;

  documentos: Array<any>;

  campos: Array<any>;

  constructor(object: ITipoDocumento) {
    this.id = object.id;
    this.nombre = object.nombre;
    this.estado = object.estado;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
    this.areas = object.areas;
    this.documentos = object.documentos;
    this.campos = object.campos;
  }
}
