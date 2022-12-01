import './App.css';
import CurrentDir from 'components/CurrentDir';
import { Directory, useFileManager } from 'hooks/useFileMap/useFileMap';

function App() {
  const fileManager = useFileManager();

  const handleCreateNewFolder = () => {
    const newDir = { parentId: fileManager.currentDirId, childrenIds: [] };
    const parentDir = fileManager.fileMap[
      fileManager.currentDirId
    ] as Directory;

    const newFileMap = fileManager.fileMap;
    newFileMap['newFile'] = newDir;
    newFileMap[fileManager.currentDirId] = {
      ...parentDir,
      childrenIds: [...parentDir.childrenIds, 'newFile'],
    };

    fileManager.setFileMap({ ...fileManager.fileMap, newFile: newDir });
  };

  return (
    <div className="App">
      <button onClick={handleCreateNewFolder}>Create New Folder</button>
      <CurrentDir fileManager={fileManager} />
    </div>
  );
}

export default App;
