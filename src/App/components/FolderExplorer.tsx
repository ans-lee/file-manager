import { ChangeEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import {
  FolderNode,
  FileNode,
  FileManager,
} from 'App/hooks/useFileManager/interface';
import FileContentsModal from './Modal/FileContentsModal';
import FolderGrid from './FolderGrid';

export interface FolderItem {
  name: string;
  isFolder: boolean;
}

interface Props {
  fileManager: FileManager;
}

const FolderExplorer = ({ fileManager }: Props) => {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState({ name: '', content: '' });
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFiltered] = useState<FolderItem[]>([]);

  const folderItems: FolderItem[] = (
    fileManager.fileMap[fileManager.currentFolderId] as FolderNode
  ).childrenIds.map((item) =>
    fileManager.fileMap[item].fileType === 'folder'
      ? { name: item, isFolder: true }
      : { name: item, isFolder: false }
  );

  const handleDoubleClick = (itemId: string) => {
    setSearchText('');
    setFiltered([]);

    let item = fileManager.fileMap[itemId];
    if (item.fileType === 'folder') {
      fileManager.changeFolder(itemId);
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
      setFiltered(folderItems.filter((item) => item.name.includes(value)));
    } else {
      setFiltered([]);
    }
  };

  return (
    <>
      <Box display="flex" width="100%" gap={2}>
        <Button
          variant="text"
          onClick={fileManager.goPrevFolder}
          disabled={fileManager.currentFolderId === 'root'}
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
        <FolderGrid
          folderFiles={filteredItems}
          handleDoubleClick={handleDoubleClick}
        />
      ) : (
        <FolderGrid
          folderFiles={folderItems}
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

export default FolderExplorer;
