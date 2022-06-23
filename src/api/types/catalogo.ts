export interface ICatalogo {
  id: number;
  nombre: string;
  tipo: string;
}

export class Catalogo implements ICatalogo {
  id: number;

  nombre: string;

  tipo: string;

  constructor(object: ICatalogo) {
    this.id = object.id;
    this.nombre = object.nombre;
    this.tipo = object.tipo;
  }
}
