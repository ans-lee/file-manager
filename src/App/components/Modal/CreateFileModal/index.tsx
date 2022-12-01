import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { modalStyle } from '../styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateFileModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2">
          New File
        </Typography>
        <TextField id="newFileName" label="Name" />
        <TextField id="newFileContent" label="Content..." />
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained">Create</Button>
      </Box>
    </Modal>
  );
};

export default CreateFileModal;
