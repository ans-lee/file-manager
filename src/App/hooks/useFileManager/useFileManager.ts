import { useState } from 'react';
import { FolderNode, FileManager, FileMap, FileNode } from './interface';

export const useFileManager = (): FileManager => {
  const [fileMap, setFileMap] = useState<FileMap>({
    root: {
      childrenIds: ['Documents', 'Pictures', 'file1'],
      fileType: 'folder',
    },
    Documents: {
      parentId: 'root',
      childrenIds: ['help.txt'],
      fileType: 'folder',
    },
    Pictures: {
      parentId: 'root',
      childrenIds: ['cat.jpeg'],
      fileType: 'folder',
    },
    file1: {
      parentId: 'root',
      content: 'Hello, this is a file',
      fileType: 'file',
    },
    'help.txt': {
      parentId: 'Documents',
      content: 'Hello world!',
      fileType: 'file',
    },
    'cat.jpeg': { parentId: 'Pictures', content: 'cat :)', fileType: 'file' },
  });
  const [currentFolderId, setCurrentFolderId] = useState('root');
  const [parentId, setParentId] = useState<string | undefined>(undefined);

  const changeFolder = (folderId: string) => {
    setParentId(currentFolderId);

    if (!(folderId in fileMap)) {
      throw Error('folder should exist in the fileMap');
    }

    setCurrentFolderId(folderId);
  };

  const goPrevFolder = () => {
    if (typeof parentId === 'undefined') {
      throw Error('parentId should not be undefined');
    }

    setCurrentFolderId(parentId);

    const newParentId = fileMap[parentId].parentId;
    if (typeof newParentId !== 'undefined') {
      setParentId(newParentId);
    }
  };

  const createNewFolder = (folderName: string) => {
    if (folderName in fileMap) {
      throw Error('A file or folder with the same name already exists');
    }

    const newFolder: FolderNode = {
      parentId: currentFolderId,
      childrenIds: [],
      fileType: 'folder',
    };
    const parentFolder = fileMap[currentFolderId] as FolderNode;

    // Copy over the file map as mutations are not valid, then add the new folder
    const newFileMap = { ...fileMap };
    newFileMap[folderName] = newFolder;
    newFileMap[currentFolderId] = {
      ...parentFolder,
      childrenIds: [...parentFolder.childrenIds, folderName],
    };

    setFileMap(newFileMap);
  };

  const createNewFile = (fileName: string, content: string) => {
    if (fileName in fileMap) {
      throw Error('A file or folder with the same name already exists');
    }

    const newFile: FileNode = {
      parentId: currentFolderId,
      content,
      fileType: 'file',
    };
    const parentFolder = fileMap[currentFolderId] as FolderNode;

    // Copy over the file map as mutations are not valid, then add the new file
    const newFileMap = { ...fileMap };
    newFileMap[fileName] = newFile;
    newFileMap[currentFolderId] = {
      ...parentFolder,
      childrenIds: [...parentFolder.childrenIds, fileName],
    };

    setFileMap(newFileMap);
  };

  return {
    currentFolderId: currentFolderId,
    fileMap,
    changeFolder,
    goPrevFolder,
    createNewFolder,
    createNewFile,
  };
};
