import { Box } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface Props {
  name: string;
  onDoubleClick: () => void;
}

const FileItem = ({ name, onDoubleClick }: Props) => {
  return (
    <Box onDoubleClick={onDoubleClick}>
      <InsertDriveFileIcon color="primary" fontSize="large" />
      <p>{name}</p>
    </Box>
  );
};

export default FileItem;
