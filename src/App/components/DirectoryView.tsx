import { ChangeEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import {
  DirectoryNode,
  FileNode,
  FileManager,
} from 'App/hooks/useFileManager/interface';
import FileContentsModal from './Modal/FileContentsModal';
import DirectoryItems from './DirectoryItems';

interface DirectoryFile {
  name: string;
  isDirectory: boolean;
}

interface Props {
  fileManager: FileManager;
}

const DirectoryView = ({ fileManager }: Props) => {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState({ name: '', content: '' });
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFiltered] = useState<DirectoryFile[]>([]);

  const dirItems: DirectoryFile[] = (
    fileManager.fileMap[fileManager.currentDirId] as DirectoryNode
  ).childrenIds.map((item) =>
    fileManager.fileMap[item].fileType === 'directory'
      ? { name: item, isDirectory: true }
      : { name: item, isDirectory: false }
  );

  const handleDoubleClick = (itemId: string) => {
    setSearchText('');
    setFiltered([]);

    let item = fileManager.fileMap[itemId];
    if (item.fileType === 'directory') {
      fileManager.changeDirectory(itemId);
    } else {
      item = item as FileNode;
      setSelectedFile({ name: itemId, content: item.content });
      setIsFileOpen(true);
    }
  };
  const handleFileNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (value !== '') {
      setFiltered(dirItems.filter((item) => item.name.includes(value)));
    } else {
      setFiltered([]);
    }
  };

  return (
    <>
      <Box display="flex" width="100%" gap={2}>
        <Button
          variant="text"
          onClick={fileManager.goPrevDirectory}
          disabled={fileManager.currentDirId === 'root'}
        >
          Back
        </Button>
        <TextField
          id="search"
          placeholder="Search..."
          value={searchText}
          onChange={handleFileNameInput}
          sx={{
            width: '100%',
          }}
        />
      </Box>
      {filteredItems.length > 0 || searchText !== '' ? (
        <DirectoryItems
          directoryFiles={filteredItems}
          handleDoubleClick={handleDoubleClick}
        />
      ) : (
        <DirectoryItems
          directoryFiles={dirItems}
          handleDoubleClick={handleDoubleClick}
        />
      )}
      <FileContentsModal
        isOpen={isFileOpen}
        onClose={() => setIsFileOpen(false)}
        fileName={selectedFile.name}
        content={selectedFile.content}
      />
    </>
  );
};

export default DirectoryView;
