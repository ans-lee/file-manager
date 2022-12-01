import { Box } from '@mui/material';
import FolderExplorer from 'App/components/FolderExplorer';
import { ManagerActions } from 'App/components/ManagerActions';
import useFileManager from 'App/hooks/useFileManager';

const FileManagerContainer = () => {
  const fileManager = useFileManager();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <ManagerActions fileManager={fileManager} />
      <FolderExplorer fileManager={fileManager} />
    </Box>
  );
};

export default FileManagerContainer;
