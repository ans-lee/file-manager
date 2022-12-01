import { Box, TextField } from '@mui/material';
import { Directory, FileManager } from 'App/hooks/useFileManager/interface';
import { ChangeEvent, useState } from 'react';
import FileContentsModal from '../Modal/FileContentsModal';

interface Props {
  fileManager: FileManager;
}

const CurrentDir = ({ fileManager }: Props) => {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState({ name: '', content: '' });
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFiltered] = useState<string[]>([]);

  const dirItems = (fileManager.fileMap[fileManager.currentDirId] as Directory)
    .childrenIds;

  const handleDoubleClick = (itemId: string) => {
    setSearchText('');
    setFiltered([]);

    const item = fileManager.fileMap[itemId];
    if ('childrenIds' in item) {
      fileManager.changeDirectory(itemId);
    } else {
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
        label="Search"
        value={searchText}
        onChange={handleFileNameInput}
        sx={{
          width: '100%',
        }}
      />
      <Box>
        {filteredItems.length > 0
          ? filteredItems.map((item, i) => (
              <p key={i} onDoubleClick={() => handleDoubleClick(item)}>
                {item}
              </p>
            ))
          : dirItems.map((item, i) => (
              <p key={i} onDoubleClick={() => handleDoubleClick(item)}>
                {item}
              </p>
            ))}
      </Box>
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
