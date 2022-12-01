import GlobalStyle from './styled.default';
import FileManagerContainer from './containers/FileManagerContainer';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <FileManagerContainer />
    </Container>
  );
};

export default App;
