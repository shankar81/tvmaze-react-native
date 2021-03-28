import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import GlobalContext from './src/context/GlobalContext';
import ShowDetail from './src/screens/ShowDetail';
import { defaultColors } from './src/utils/colors';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(true);

  function onChangeTheme() {
    setDarkMode(mode => !mode);
  }

  return (
    <GlobalContext.Provider
      value={{ colors: defaultColors, isDarkMode, changeTheme: onChangeTheme }}>
      <StatusBar backgroundColor={defaultColors.primary} />
      <ShowDetail />
    </GlobalContext.Provider>
  );
};

export default App;
