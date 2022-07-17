import { Usuario } from './usuario';

export interface IDocumentoEvento {
  id: number;
  tipoEvento: string;
  color: string;
  ejecutor?: Usuario;
  documentoId: number;
  estado: boolean;
  updatedAt: string;
  createdAt: string;
}

export class DocumentoEvento implements IDocumentoEvento {
  id: number;

  tipoEvento: string;

  color: string;

  ejecutor?: Usuario;

  documentoId: number;

  estado: boolean;

  updatedAt: string;

  createdAt: string;

  constructor(object: IDocumentoEvento) {
    this.id = object.id;
    this.tipoEvento = object.tipoEvento;
    this.color = object.color;
    this.ejecutor = object.ejecutor;
    this.documentoId = object.documentoId;
    this.estado = object.estado;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
  }
}
