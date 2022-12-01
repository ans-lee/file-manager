import { useState } from 'react';
import { FileManager, FileMap } from './interface';

export const useFileManager = (): FileManager => {
  const [fileMap, setFileMap] = useState<FileMap>({
    root: { childrenIds: ['Documents', 'Pictures'], fileType: 'directory' },
    Documents: {
      parentId: 'root',
      childrenIds: ['help.jpeg'],
      fileType: 'directory',
    },
    Pictures: {
      parentId: 'root',
      childrenIds: ['cat.jpeg'],
      fileType: 'directory',
    },
    'help.jpeg': { parentId: 'Documents', content: ':((((', fileType: 'file' },
    'cat.jpeg': { parentId: 'Pictures', content: ':((((', fileType: 'file' },
  });
  const [currentDirId, setCurrentDirId] = useState('root');
  const [parentId, setParentId] = useState<string | undefined>(undefined);

  const changeDirectory = (directory: string) => {
    setParentId(currentDirId);

    if (!(directory in fileMap)) {
      throw Error('directory should exist in the fileMap');
    }

    setCurrentDirId(directory);
  };

  const goPrevDirectory = () => {
    if (typeof parentId === 'undefined') {
      throw Error('parentId should not be undefined');
    }

    setCurrentDirId(parentId);

    const newParentId = fileMap[parentId].parentId;
    if (typeof newParentId !== 'undefined') {
      setParentId(newParentId);
    }
  };

  return {
    currentDirId,
    fileMap,
    changeDirectory,
    goPrevDirectory,
    setFileMap,
  };
};
