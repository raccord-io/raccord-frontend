import { green, red } from '@ant-design/colors';

const themeConfig = {
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    primary: '#1890ff',
    success: green[6],
    error: red[5],
    pink: '#ff1890',
    green: green,
    red: red,
    background: '#f0f2f5',
    divider: 'rgba(0, 0, 0, 0.12)',
    grey: ['#f0f2f5', '#d8d9dc', '#c0c1c4'],
    orange: ['#ff5f1f', '#fa541c', '#ff8718'],
    blue: [
      '#e6f7ff',
      '#bae7ff',
      '#91d5ff',
      '#69c0ff',
      '#40a9ff',
      '#1890ff',
      '#096dd9',
      '#0050b3',
      '#003a8c',
      '#002766'
    ]
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
