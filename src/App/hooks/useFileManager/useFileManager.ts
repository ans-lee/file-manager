import { useState } from 'react';
import { FileManager, FileMap } from './interface';

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
