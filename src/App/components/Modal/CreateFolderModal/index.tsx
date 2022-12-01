import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { modalStyle } from '../styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateFolderModal = ({ isOpen, onClose, onSubmit }: Props) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2">
          New Folder
        </Typography>
        <TextField id="newFolderName" label="Name" />
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateFolderModal;
