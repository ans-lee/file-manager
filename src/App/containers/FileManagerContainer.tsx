import { Box } from '@mui/material';
import CurrentDir from 'App/components/DirectoryView';
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
      <CurrentDir fileManager={fileManager} />
    </Box>
  );
};

export default FileManagerContainer;
