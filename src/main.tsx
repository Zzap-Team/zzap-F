import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/theme.ts';
import { client } from './apollo.tsx';
import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
