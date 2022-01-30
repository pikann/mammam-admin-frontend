import {
  StylesProvider,
} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import Colors from './constants/Colors';
import routes from './routes';
import { store } from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
      contrastText: Colors.text,
    },
    secondary: {
      main: Colors.secondary,
      contrastText: Colors.text,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Helmet defaultTitle="MamMam Admin Page"></Helmet>
          <StylesProvider injectFirst>{routes}</StylesProvider>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
