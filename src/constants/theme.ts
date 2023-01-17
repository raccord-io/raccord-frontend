import { green, red } from '@ant-design/colors';

const themeConfig = {
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    primary: 'rgba(0, 76, 106, 255)',
    secondary: 'rgba(31, 30, 30, 0.8)',
    success: green[6],
    error: red[5],
    pink: '#ff1890',
    blue: 'rgba(0, 76, 106, 255)',
    green: 'rgba(56, 181, 72)',
    red: 'rgba(239, 56, 66)',
    grey: 'rgba(237, 231, 235)'
  },
  spacingUnit: 8
};

/* Do not modify here, edit themeConfig instead */
export const theme = {
  palette: {
    ...themeConfig.palette
  },
  spacing: (...units: number[]) =>
    units.map((unit) => `${themeConfig.spacingUnit * unit}px`).join(' ')
};
