import { File } from './file';
import { DocumentoEvento } from './documento-evento';
import { ComodinObject } from '../../types';
import { TipoDocumento } from './tipo-documento';

export interface IDocumento {
  id: number;
  numDoc: number;
  fechaRecepcion: string | Date;
  tipoDocumentosId: number;
  fileId?: number;
  campos: ComodinObject;
  estado: boolean;
  tipoUltimoEvento?: string;
  updatedAt: string | Date;
  createdAt: string | Date;

  tipoDocumento?: TipoDocumento;
  ultimoEvento?: DocumentoEvento;
  documentoEventos?: DocumentoEvento[];
  file?: File;
}

export class Documento implements IDocumento {
  id: number;

  numDoc: number;

  fechaRecepcion: string | Date;

  tipoDocumentosId: number;

  fileId?: number | undefined;

  campos: ComodinObject;

  estado: boolean;

  updatedAt: string | Date;

  createdAt: string | Date;

  tipoDocumento?: TipoDocumento | undefined;

  documentoEventos?: DocumentoEvento[] | undefined;

  tipoUltimoEvento?: string | undefined;

  ultimoEvento?: DocumentoEvento;

  file?: File;

  constructor(object: IDocumento) {
    this.id = object.id;
    this.numDoc = object.numDoc;
    this.fechaRecepcion = object.fechaRecepcion;
    this.tipoDocumentosId = object.tipoDocumentosId;
    this.fileId = object.fileId;
    this.campos = object.campos;
    this.estado = object.estado;
    this.tipoUltimoEvento = object.tipoUltimoEvento;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
    this.tipoDocumento = object.tipoDocumento;
    this.documentoEventos = object.documentoEventos;
    this.ultimoEvento = object.ultimoEvento;
    this.file = object.file;
  }
}
