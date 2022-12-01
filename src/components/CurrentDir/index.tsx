import { Directory, FileManager } from 'hooks/useFileMap/useFileMap';

interface Props {
  fileManager: FileManager;
}

const CurrentDir = ({ fileManager }: Props) => {
  const currentDirItems = (
    fileManager.fileMap[fileManager.currentDirId] as Directory
  ).childrenIds;

  return (
    <div>
      {currentDirItems.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
      <button onClick={() => fileManager.setCurrentDirId('Documents')}>
        CD to documents
      </button>
    </div>
  );
};

export default CurrentDir;
