import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

export const theme = extendTheme({
  breakpoints,
  colors: {
    black: '#16161D',
    primary: '#bc0812',
    gray: {
      100: '#f4f6f7',
      500: '#575958',
      700: '#282828',
    },
  },
  fonts: {
    mono: `'Menlo', monospace`,
    body: `'Roboto', sans-serif`,
    heading: `'Roboto', sans-serif`,
  },
  fontSizes: {
    sm: '1rem',
    md: '1.125rem',
    lg: '2.25rem',
    xl: '2.5rem',
    '2xl': '3.5rem',
  },
  sizes: {
    xs: '15.5rem',
    sm: '22.5rem',
  },
  styles: {
    global: {
      svg: {
        fontSize: '1.25rem',
        transform: 'translateY(0.125rem)',
      },
      '.hide-scrollbar::-webkit-scrollbar': {
        display: 'none',
      },
      '.paddingX': {
        paddingX: ['1.5rem', '1.5rem', '5rem', '15rem'],
      },
      '.paddingY': {
        paddingY: ['2.25rem', '2.25rem', '5rem'],
      },
    },
  },
});
