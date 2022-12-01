import { Box, Button } from '@mui/material';
import CurrentDir from 'App/components/CurrentDir';
import { ManagerActions } from 'App/components/ManagerActions/ManagerActions';
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
      {fileManager.currentDirId !== 'root' && (
        <Button variant="outlined" onClick={fileManager.goPrevDirectory}>
          Back
        </Button>
      )}
    </Box>
  );
};

export default FileManagerContainer;
