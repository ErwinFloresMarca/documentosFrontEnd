export interface IArea {
  id: number;
  nombre: string;
  updatedAt: string | Date;
  createdAt: string | Date;

  tiposDocumentos: Array<any>;
  documentos: Array<any>;
  responsables: Array<any>;
}

export class Area implements IArea {
  id: number;

  nombre: string;

  updatedAt: string | Date;

  createdAt: string | Date;

  tiposDocumentos: Array<any>;

  documentos: Array<any>;

  responsables: Array<any>;

  constructor(object: IArea) {
    this.id = object.id;
    this.nombre = object.nombre;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
    this.tiposDocumentos = object.tiposDocumentos;
    this.documentos = object.documentos;
    this.responsables = object.responsables;
  }
}
