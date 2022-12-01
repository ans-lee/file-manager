import { Dispatch, SetStateAction } from 'react';

export interface File {
  content: string;
  parentId?: string;
}

export interface Directory {
  parentId?: string;
  childrenIds: string[];
}

export interface FileMap {
  [id: string]: File | Directory;
}

export interface FileManager {
  currentDirId: string;
  fileMap: FileMap;
  setCurrentDirId: Dispatch<SetStateAction<string>>;
  setFileMap: Dispatch<SetStateAction<FileMap>>;
}
