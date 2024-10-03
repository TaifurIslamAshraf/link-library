"use client";

import localFont from 'next/font/local';
import { createTheme, ThemeProvider } from '@mui/material';
import './globals.css';

// Load the Galada font
const galada = localFont({
  src: './fonts/Galada-Regular.ttf',
  variable: '--font-galada', // Using CSS variable to reference the font
});

const theme = createTheme({
  typography: {
    fontFamily: `${galada.style.fontFamily}, sans-serif`,
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={galada.className}> 
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
