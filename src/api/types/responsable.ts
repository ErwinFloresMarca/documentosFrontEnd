import { Area } from './area';
import { Usuario } from './usuario';

export interface IResponsable {
  id: number;
  areaId: number;
  usuarioId: number;
  estado: boolean;
  updatedAt: string;
  createdAt: string;

  area?: Area;
  usuario?: Usuario;
}

export class Responsable implements IResponsable {
  id: number;

  areaId: number;

  usuarioId: number;

  estado: boolean;

  area?: Area | undefined;

  usuario?: Usuario | undefined;

  updatedAt: string;

  createdAt: string;

  constructor(object: IResponsable) {
    this.id = object.id;
    this.areaId = object.areaId;
    this.usuarioId = object.usuarioId;
    this.estado = object.estado;
    this.updatedAt = object.updatedAt;
    this.createdAt = object.createdAt;

    this.area = object.area;
    this.usuario = object.usuario;
  }
}
