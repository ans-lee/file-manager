import { Box, Button } from '@mui/material';
import { Directory, FileManager } from 'App/hooks/useFileManager/interface';

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

  return (
    <Box display="flex">
      <Button variant="outlined" onClick={handleCreateNewFolder}>
        Create New Folder
      </Button>
      <Button variant="outlined" onClick={handleCreateNewFolder}>
        Create New File
      </Button>
    </Box>
  );
};
