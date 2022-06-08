declare interface codeMessageMapTypes {
  400: string;
  401: string;
  403: string;
  404: string;
  405: string;
  500: string;
  [key: string]: string;
}

const codeMessageMap: codeMessageMapTypes = {
  400: '[400]:Parámetro de solicitud incorrecto',
  401: '[401]:Error de autenticación',
  403: '[403]:Acceso denegado',
  404: '[404]:Ruta nop encontrada',
  405: '[405]:Método de solicitud incorrecto',
  500: '[500]:Error del Servidor',
};

const showCodeMessage = (code: number | string): string => {
  return codeMessageMap[JSON.stringify(code)] || 'Conexión de red defectuosa, por favor inténtelo mas tarde!';
};

export default showCodeMessage;
