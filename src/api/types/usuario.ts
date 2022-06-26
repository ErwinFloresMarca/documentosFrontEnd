export interface IUsuario {
  id: number;
  rol: string;
  estado: number;
  nombres: string;
  paterno?: string;
  materno: string;
  ci?: string;
  celular?: string;
  email?: string;
  usuario: string;
  avatar?: string;
  updatedAt: string | Date;
  createdAt: string | Date;
}

export class Usuario implements IUsuario {
  id: number;

  rol: string;

  estado: number;

  nombres: string;

  paterno?: string;

  materno: string;

  ci?: string;

  celular?: string;

  email?: string;

  usuario: string;

  avatar?: string;

  updatedAt: string | Date;

  createdAt: string | Date;

  constructor(object: IUsuario) {
    this.id = object.id;
    this.rol = object.rol;
    this.estado = object.estado;
    this.nombres = object.nombres;
    this.paterno = object.paterno;
    this.materno = object.materno;
    this.ci = object.ci;
    this.celular = object.celular;
    this.email = object.email;
    this.usuario = object.usuario;
    this.avatar = object.avatar;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;
  }
}
