import { Dispatch, SetStateAction } from 'react';

export interface Node {
  parentId?: string;
  fileType: 'file' | 'directory';
}

export interface FileNode extends Node {
  content: string;
}

export interface DirectoryNode extends Node {
  childrenIds: string[];
}

export interface FileMap {
  [id: string]: FileNode | DirectoryNode;
}

export interface FileManager {
  currentDirId: string;
  fileMap: FileMap;
  changeDirectory: (directory: string) => void;
  goPrevDirectory: () => void;
  setFileMap: Dispatch<SetStateAction<FileMap>>;
}
