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
  createNewFolder: (folderName: string) => void;
  createNewFile: (fileName: string, content: string) => void;
}
