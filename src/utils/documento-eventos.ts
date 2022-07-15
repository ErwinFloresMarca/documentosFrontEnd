export interface ITipoEvento {
  tipo: string;
  color: string;
}
export default class DocumentoEventoTipos {
  designado: ITipoEvento = {
    tipo: 'DESIGNADO',
    color: '#2563eb',
  };

  pendiente: ITipoEvento = {
    tipo: 'PENDIENTE',
    color: '#f59e0b',
  };

  culminado: ITipoEvento = {
    tipo: 'CULMINADO',
    color: '#84cc16',
  };
}
