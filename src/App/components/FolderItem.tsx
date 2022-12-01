import { Box } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

interface Props {
  name: string;
  onDoubleClick: () => void;
}

const FolderItem = ({ name, onDoubleClick }: Props) => {
  return (
    <Box onDoubleClick={onDoubleClick}>
      <FolderIcon color="primary" fontSize="large" />
      <p>{name}</p>
    </Box>
  );
};

export default FolderItem;
