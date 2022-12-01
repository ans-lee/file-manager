import { Box, Button } from '@mui/material';
import { Directory, FileManager } from 'App/hooks/useFileManager/interface';
import { useState } from 'react';
import CreateFileModal from '../Modal/CreateFileModal';
import CreateFolderModal from '../Modal/CreateFolderModal';

interface Props {
  fileManager: FileManager;
}

export const ManagerActions = ({ fileManager }: Props) => {
  const handleCreateNewFolder = () => {
    const newDir = { parentId: fileManager.currentDirId, childrenIds: [] };
    const parentDir = fileManager.fileMap[
      fileManager.currentDirId
    ] as Directory;

    const newFileMap = fileManager.fileMap;
    newFileMap['newFile'] = newDir;
    newFileMap[fileManager.currentDirId] = {
      ...parentDir,
      childrenIds: [...parentDir.childrenIds, 'newFile'],
    };

    fileManager.setFileMap({ ...fileManager.fileMap, newFile: newDir });
  };

  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

  return (
    <>
      <Box display="flex">
        <Button variant="outlined" onClick={() => setIsNewFileModalOpen(true)}>
          Create New Folder
        </Button>
        <Button
          variant="outlined"
          onClick={() => setIsNewFolderModalOpen(true)}
        >
          Create New File
        </Button>
      </Box>
      <CreateFileModal
        isOpen={isNewFileModalOpen}
        onClose={() => setIsNewFileModalOpen(false)}
      />
      <CreateFolderModal
        isOpen={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        onSubmit={() => handleCreateNewFolder()}
      />
    </>
  );
};
