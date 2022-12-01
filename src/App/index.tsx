import GlobalStyle from './styled.default';
import FileManagerContainer from './containers/FileManagerContainer';
import { Box, Container, StyledEngineProvider } from '@mui/material';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyle />
      <Container>
        <Box
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <FileManagerContainer />
        </Box>
      </Container>
    </StyledEngineProvider>
  );
};

export default App;
