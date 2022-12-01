import { Box } from '@mui/material';
import CurrentDir from 'App/components/CurrentDir';
import { ManagerActions } from 'App/components/ManagerActions/ManagerActions';
import useFileManager from 'App/hooks/useFileManager';

const FileManagerContainer = () => {
  const fileManager = useFileManager();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <ManagerActions fileManager={fileManager} />
      <CurrentDir fileManager={fileManager} />
    </Box>
  );
};

export default FileManagerContainer;
