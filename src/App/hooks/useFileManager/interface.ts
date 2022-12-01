export interface Node {
  parentId?: string;
  fileType: 'file' | 'folder';
}

export interface FileNode extends Node {
  content: string;
}

export interface FolderNode extends Node {
  childrenIds: string[];
}

export interface FileMap {
  [id: string]: FileNode | FolderNode;
}

export interface FileManager {
  currentFolderId: string;
  fileMap: FileMap;
  changeFolder: (folderId: string) => void;
  goPrevFolder: () => void;
  createNewFolder: (folderName: string) => void;
  createNewFile: (fileName: string, content: string) => void;
}
