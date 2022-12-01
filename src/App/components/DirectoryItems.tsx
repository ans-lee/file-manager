import { Grid } from '@mui/material';
import FileItem from './FileItem';
import FolderItem from './FolderItem';

interface DirectoryFile {
  name: string;
  isDirectory: boolean;
}

interface Props {
  directoryFiles: DirectoryFile[];
  handleDoubleClick: (itemId: string) => void;
}

const DirectoryItems = ({ directoryFiles, handleDoubleClick }: Props) => {
  return (
    <Grid container spacing={2} columns={6} height={500} marginTop={2}>
      {directoryFiles.map((item, i) => (
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
  );
};

export default DirectoryItems;
