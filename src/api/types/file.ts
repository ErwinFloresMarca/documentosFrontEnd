export interface IFile {
  id: number;
  mimeType: string;
  originalName: string;
  fileName: string;
  size: number;
}

export class File implements IFile {
  id: number;

  mimeType: string;

  originalName: string;

  fileName: string;

  size: number;

  constructor(object: IFile) {
    this.id = object.id;
    this.mimeType = object.mimeType;
    this.originalName = object.originalName;
    this.fileName = object.fileName;
    this.size = object.size;
  }
}
