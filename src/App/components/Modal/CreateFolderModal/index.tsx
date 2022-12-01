import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { modalStyle } from '../styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (folderName: string) => void;
}

const CreateFolderModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [folderName, setFolderName] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(folderName);
    handleOnClose();
  };
  const handleOnClose = () => {
    setFolderName('');
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <form onSubmit={handleSubmit}>
        <Box sx={modalStyle}>
          <Typography variant="h5" component="h2">
            New Folder
          </Typography>
          <TextField
            id="newFolderName"
            label="Name"
            value={folderName}
            onChange={handleInput}
          />
          <Button variant="outlined" color="secondary" onClick={handleOnClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateFolderModal;
