import GlobalStyle from './styled.default';
import FileManagerContainer from './containers/FileManagerContainer';
import { Container, StyledEngineProvider } from '@mui/material';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyle />
      <Container>
        <FileManagerContainer />
      </Container>
    </StyledEngineProvider>
  );
};

export default App;
