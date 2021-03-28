import React from 'react';
import { defaultColors } from '../utils/colors';

const GlobalContext = React.createContext({
  colors: defaultColors,
  isDarkMode: false,
  changeTheme: () => {},
});

export default GlobalContext;
