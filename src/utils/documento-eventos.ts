export interface ITipoEvento {
  tipo: string;
  color: string;
}

const DocumentoEventoTipos: {
  designado: ITipoEvento;
  pendiente: ITipoEvento;
  culminado: ITipoEvento;
} = {
  designado: {
    tipo: 'DESIGNADO',
    color: '#2563eb',
  },

  pendiente: {
    tipo: 'PENDIENTE',
    color: '#f59e0b',
  },

  culminado: {
    tipo: 'CULMINADO',
    color: '#84cc16',
  },
};
export default DocumentoEventoTipos;
