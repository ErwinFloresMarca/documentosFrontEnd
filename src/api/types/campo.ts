import { Catalogo } from './catalogo';

export interface ICampo {
  id: number;
  nombre: string;
  label: string;
  placeholder: string;
  type: string;
  key: string;
  tipoCatalogo: string;
  conCatalogo: boolean;
  required: boolean;
  catalogos?: Catalogo[];
}

export class Campo implements ICampo {
  id: number;

  nombre: string;

  label: string;

  placeholder: string;

  type: string;

  key: string;

  tipoCatalogo: string;

  conCatalogo: boolean;

  required: boolean;

  catalogos?: Catalogo[];

  constructor(object: ICampo) {
    this.id = object.id;
    this.nombre = object.nombre;
    this.label = object.label;
    this.placeholder = object.placeholder;
    this.type = object.type;
    this.key = object.key;
    this.tipoCatalogo = object.tipoCatalogo;
    this.conCatalogo = object.conCatalogo;
    this.required = object.required;
    this.catalogos = object.catalogos;
  }
}
