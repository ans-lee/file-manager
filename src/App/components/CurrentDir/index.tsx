import { Directory, FileManager } from 'App/hooks/useFileManager/interface';

interface Props {
  fileManager: FileManager;
}

const CurrentDir = ({ fileManager }: Props) => {
  const currentDirItems = (
    fileManager.fileMap[fileManager.currentDirId] as Directory
  ).childrenIds;

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
