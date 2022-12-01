import { Directory, FileManager } from 'hooks/useFileMap/useFileMap';

interface Props {
  fileManager: FileManager;
}

const CurrentDir = ({ fileManager }: Props) => {
  const currentDirItems = (
    fileManager.fileMap[fileManager.currentDirId] as Directory
  ).childrenIds;
  console.log(fileManager.currentDirId);

  const handleDoubleClick = (itemId: string) => {
    const item = fileManager.fileMap[itemId];
    if ('childrenIds' in item) {
      fileManager.setCurrentDirId(itemId);
    }
  };

  return (
    <div>
      {currentDirItems.map((item, i) => (
        <p key={i} onDoubleClick={() => handleDoubleClick(item)}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default CurrentDir;
