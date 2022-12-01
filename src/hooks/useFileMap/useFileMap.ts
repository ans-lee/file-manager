import { Dispatch, SetStateAction, useState } from 'react';

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

export const useFileManager = (): FileManager => {
  const [fileMap, setFileMap] = useState<FileMap>({
    root: { childrenIds: ['Documents', 'Pictures'] },
    Documents: { parentId: 'root', childrenIds: ['help.jpeg'] },
    Pictures: { parentId: 'root', childrenIds: ['cat.jpeg'] },
    'help.jpeg': { parentId: 'Documents', content: ':((((' },
    'cat.jpeg': { parentId: 'Pictures', content: ':((((' },
  });
  const [currentDirId, setCurrentDirId] = useState('root');

  return { currentDirId, fileMap, setCurrentDirId, setFileMap };
};
