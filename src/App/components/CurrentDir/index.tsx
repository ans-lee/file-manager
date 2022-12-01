import { Directory, FileManager } from 'App/hooks/useFileManager/interface';
import { useState } from 'react';
import FileContentsModal from '../Modal/FileContentsModal';

interface Props {
  fileManager: FileManager;
}

const CurrentDir = ({ fileManager }: Props) => {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState({ name: '', content: '' });

  const currentDirItems = (
    fileManager.fileMap[fileManager.currentDirId] as Directory
  ).childrenIds;

  const handleDoubleClick = (itemId: string) => {
    const item = fileManager.fileMap[itemId];
    if ('childrenIds' in item) {
      fileManager.changeDirectory(itemId);
    } else {
      setSelectedFile({ name: itemId, content: item.content });
      setIsFileOpen(true);
    }
  };

  return (
    <>
      <div>
        {currentDirItems.map((item, i) => (
          <p key={i} onDoubleClick={() => handleDoubleClick(item)}>
            {item}
          </p>
        ))}
      </div>
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
