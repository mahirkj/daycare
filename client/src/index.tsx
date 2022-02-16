import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { Index } from './Pages/index'
// import {UseCreateUser} from './resources/useCreateUser'
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme  , ThemeProvider } from "@material-ui/core/styles";
import './assets/fonts/fontawesome/css/all.css';
// import store from './redux/store';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Provider } from 'react-redux';
const theme = createTheme ({
  palette: {
    background: {
      default: "#FFFFFF"
    }
  }
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Index />
      </ThemeProvider>
    </QueryClientProvider>,
  document.getElementById('root')
);
reportWebVitals();
