import { Box, Button } from '@mui/material';
import {
  DirectoryNode,
  FileManager,
  FileNode,
} from 'App/hooks/useFileManager/interface';
import { useState } from 'react';
import CreateFileModal from '../Modal/CreateFileModal';
import CreateFolderModal from '../Modal/CreateFolderModal';

interface Props {
  fileManager: FileManager;
}

export const ManagerActions = ({ fileManager }: Props) => {
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

  const handleCreateNewFolder = (folderName: string) => {
    const newDir: DirectoryNode = {
      parentId: fileManager.currentDirId,
      childrenIds: [],
      fileType: 'directory',
    };
    const parentDir = fileManager.fileMap[
      fileManager.currentDirId
    ] as DirectoryNode;

    // Copy over the file map as mutations are not valid, then add the new folder
    const newFileMap = { ...fileManager.fileMap };
    newFileMap[folderName] = newDir;
    newFileMap[fileManager.currentDirId] = {
      ...parentDir,
      childrenIds: [...parentDir.childrenIds, folderName],
    };

    fileManager.setFileMap(newFileMap);
  };

  const handleCreateNewFile = (fileName: string, content: string) => {
    const newFile: FileNode = {
      parentId: fileManager.currentDirId,
      content,
      fileType: 'file',
    };
    const parentDir = fileManager.fileMap[
      fileManager.currentDirId
    ] as DirectoryNode;

    // Copy over the file map as mutations are not valid, then add the new file
    const newFileMap = { ...fileManager.fileMap };
    newFileMap[fileName] = newFile;
    newFileMap[fileManager.currentDirId] = {
      ...parentDir,
      childrenIds: [...parentDir.childrenIds, fileName],
    };

    fileManager.setFileMap(newFileMap);
  };

  return (
    <>
      <Box display="flex" width="100%">
        <Button variant="outlined" onClick={() => setIsNewFileModalOpen(true)}>
          Create New File
        </Button>
        <Button
          variant="outlined"
          onClick={() => setIsNewFolderModalOpen(true)}
          sx={{ marginLeft: 2 }}
        >
          Create New Folder
        </Button>
      </Box>
      <CreateFileModal
        isOpen={isNewFileModalOpen}
        onClose={() => setIsNewFileModalOpen(false)}
        onSubmit={handleCreateNewFile}
      />
      <CreateFolderModal
        isOpen={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        onSubmit={handleCreateNewFolder}
      />
    </>
  );
};
