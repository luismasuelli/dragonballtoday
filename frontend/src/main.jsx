import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css';
import App from './App.jsx';

const theme = createTheme({
  primaryColor: 'orange',
  fontFamily: '"Rajdhani", "Segoe UI", sans-serif',
  headings: {
    fontFamily: '"Rajdhani", "Segoe UI", sans-serif',
    fontWeight: '700',
  },
  colors: {
    dbOrange: [
      '#fff4e6',
      '#ffe8cc',
      '#ffd8a8',
      '#ffc078',
      '#ffa94d',
      '#ff922b',
      '#fd7e14',
      '#f76707',
      '#e8590c',
      '#d9480f',
    ],
    dbYellow: [
      '#fffce6',
      '#fff9cc',
      '#fff3a8',
      '#ffec78',
      '#ffe34d',
      '#ffd700',
      '#f5cc00',
      '#e6bf00',
      '#d4af37',
      '#c9a227',
    ],
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>
);
