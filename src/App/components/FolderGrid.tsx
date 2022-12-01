import { Grid } from '@mui/material';
import FileItem from './FileItem';
import { FolderItem } from './FolderExplorer';
import FolderCard from './FolderCard';

interface Props {
  folderFiles: FolderItem[];
  handleDoubleClick: (itemId: string) => void;
}

const FolderGrid = ({ folderFiles, handleDoubleClick }: Props) => {
  return (
    <Grid container spacing={2} columns={6} height={500} marginTop={2}>
      {folderFiles.map((item, i) => (
        <Grid item xs={1} key={i}>
          {item.isFolder ? (
            <FolderCard
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

export default FolderGrid;
