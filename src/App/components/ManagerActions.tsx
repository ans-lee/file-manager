import { Box, Button } from '@mui/material';
import { useState } from 'react';
import CreateFileModal from './Modal/CreateFileModal';
import CreateFolderModal from './Modal/CreateFolderModal';

interface Props {
  createNewFile: (fileName: string, content: string) => void;
  createNewFolder: (folderName: string) => void;
}

export const ManagerActions = ({ createNewFile, createNewFolder }: Props) => {
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

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
        onSubmit={createNewFile}
      />
      <CreateFolderModal
        isOpen={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        onSubmit={createNewFolder}
      />
    </>
  );
};
