import { ChangeEvent, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import {
  DirectoryNode,
  FileNode,
  FileManager,
} from 'App/hooks/useFileManager/interface';
import FileContentsModal from '../Modal/FileContentsModal';
import FolderItem from '../FolderItem';
import FileItem from '../FileItem';

interface Props {
  fileManager: FileManager;
}

interface DirectoryItems {
  name: string;
  isDirectory: boolean;
}

const CurrentDir = ({ fileManager }: Props) => {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState({ name: '', content: '' });
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFiltered] = useState<DirectoryItems[]>([]);

  const dirItems: DirectoryItems[] = (
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
      <Grid container spacing={2} columns={6} height={500} marginTop={2}>
        {filteredItems.length > 0 || searchText !== ''
          ? filteredItems.map((item, i) => (
              <Grid item xs={1} key={i}>
                {item.isDirectory ? (
                  <FolderItem
                    name={item.name}
                    onDoubleClick={() => handleDoubleClick(item.name)}
                  />
                ) : (
                  <FileItem
                    name={item.name}
                    onDoubleClick={() => handleDoubleClick(item.name)}
                  />
                )}
              </Grid>
            ))
          : dirItems.map((item, i) => (
              <Grid item xs={1} key={i}>
                {item.isDirectory ? (
                  <FolderItem
                    name={item.name}
                    onDoubleClick={() => handleDoubleClick(item.name)}
                  />
                ) : (
                  <FileItem
                    name={item.name}
                    onDoubleClick={() => handleDoubleClick(item.name)}
                  />
                )}
              </Grid>
            ))}
      </Grid>
      <FileContentsModal
        isOpen={isFileOpen}
        onClose={() => setIsFileOpen(false)}
        fileName={selectedFile.name}
        content={selectedFile.content}
      />
    </>
  );
};

export default CurrentDir;
