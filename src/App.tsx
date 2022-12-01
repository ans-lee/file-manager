import './App.css';
import CurrentDir from 'components/CurrentDir';
import { useFileManager } from 'hooks/useFileMap/useFileMap';

function App() {
  const fileManager = useFileManager();

  return (
    <div className="App">
      <CurrentDir fileManager={fileManager} />
    </div>
  );
}

export default App;
