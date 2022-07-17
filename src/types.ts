/* eslint-disable no-shadow */
export interface ComodinObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export enum ApiRol {
  admin = 'admin',
  secretario = 'secretario',
  director = 'director',
  tecnico = 'tecnico',
}
