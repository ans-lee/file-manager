import { useState } from 'react';
import { DirectoryNode, FileManager, FileMap, FileNode } from './interface';

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

  const createNewFolder = (folderName: string) => {
    const newDir: DirectoryNode = {
      parentId: currentDirId,
      childrenIds: [],
      fileType: 'directory',
    };
    const parentDir = fileMap[currentDirId] as DirectoryNode;

    // Copy over the file map as mutations are not valid, then add the new folder
    const newFileMap = { ...fileMap };
    newFileMap[folderName] = newDir;
    newFileMap[currentDirId] = {
      ...parentDir,
      childrenIds: [...parentDir.childrenIds, folderName],
    };

    setFileMap(newFileMap);
  };

  const createNewFile = (fileName: string, content: string) => {
    const newFile: FileNode = {
      parentId: currentDirId,
      content,
      fileType: 'file',
    };
    const parentDir = fileMap[currentDirId] as DirectoryNode;

    // Copy over the file map as mutations are not valid, then add the new file
    const newFileMap = { ...fileMap };
    newFileMap[fileName] = newFile;
    newFileMap[currentDirId] = {
      ...parentDir,
      childrenIds: [...parentDir.childrenIds, fileName],
    };

    setFileMap(newFileMap);
  };

  return {
    currentDirId,
    fileMap,
    changeDirectory,
    goPrevDirectory,
    createNewFolder,
    createNewFile,
  };
};
