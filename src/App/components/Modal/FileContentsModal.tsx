import { Box, Button, Modal, Typography } from '@mui/material';
import { modalStyle } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  content: string;
}

const FileContentsModal = ({ isOpen, onClose, fileName, content }: Props) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2">
          {fileName}
        </Typography>
        <Typography variant="body1" component="p">
          {content !== '' ? (
            content
          ) : (
            <Typography color="GrayText" fontStyle="italic">
              No content in this file
            </Typography>
          )}
        </Typography>
        <Button variant="outlined" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FileContentsModal;
