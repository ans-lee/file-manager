import { ChangeEvent, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import {
  DirectoryNode,
  FileNode,
  FileManager,
} from 'App/hooks/useFileManager/interface';
import FileContentsModal from '../Modal/FileContentsModal';
import FolderItem from '../FolderItem';

interface Props {
  fileManager: FileManager;
}

const CurrentDir = ({ fileManager }: Props) => {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState({ name: '', content: '' });
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFiltered] = useState<string[]>([]);

  const dirItems = (
    fileManager.fileMap[fileManager.currentDirId] as DirectoryNode
  ).childrenIds;

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
      setFiltered(dirItems.filter((item) => item.includes(value)));
    } else {
      setFiltered([]);
    }
  };

  return (
    <>
      <TextField
        id="search"
        placeholder="Search..."
        value={searchText}
        onChange={handleFileNameInput}
        sx={{
          width: '100%',
        }}
      />
      <Grid container spacing={2} columns={6}>
        {filteredItems.length > 0 || searchText !== ''
          ? filteredItems.map((item, i) => (
              <Grid item xs={1} key={i}>
                <FolderItem
                  name={item}
                  onDoubleClick={() => handleDoubleClick(item)}
                />
              </Grid>
            ))
          : dirItems.map((item, i) => (
              <Grid item xs={1} key={i}>
                <FolderItem
                  name={item}
                  onDoubleClick={() => handleDoubleClick(item)}
                />
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
