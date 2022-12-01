import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { modalStyle } from '../styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fileName: string, contents: string) => boolean;
}

const CreateFileModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [isError, setIsError] = useState(false);

  const handleFileNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  const handleContentsInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!onSubmit(fileName, content)) {
      setIsError(true);
      return;
    }

    handleOnClose();
  };
  const handleOnClose = () => {
    setIsError(false);
    setFileName('');
    setContent('');
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Box sx={modalStyle}>
          <Typography variant="h5" component="h2">
            New File
          </Typography>
          <TextField
            id="newFileName"
            label="Name"
            value={fileName}
            onChange={handleFileNameInput}
            error={isError}
            helperText={
              isError
                ? 'A file or directory with the same name already exists'
                : ''
            }
          />
          <TextField
            id="newFileContent"
            placeholder="Content"
            multiline
            rows={10}
            value={content}
            onChange={handleContentsInput}
          />
          <Button variant="outlined" color="primary" onClick={handleOnClose}>
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

export default CreateFileModal;
