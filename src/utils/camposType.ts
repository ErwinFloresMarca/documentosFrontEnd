// eslint-disable-next-line no-shadow
export enum camposInputTypes {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  textarea = 'textarea',
  date = 'date',
  datetime = 'datetime',
}

export default [
  { label: 'TEXTO', key: camposInputTypes.string },
  { label: 'NUMERO', key: camposInputTypes.number },
  { label: 'SI O NO', key: camposInputTypes.boolean },
  { label: 'TEXTO LARGO', key: camposInputTypes.textarea },
  { label: 'FECHA', key: camposInputTypes.date },
  { label: 'FECHA Y HORA', key: camposInputTypes.datetime },
];
