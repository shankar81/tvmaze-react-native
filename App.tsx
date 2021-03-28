import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import GlobalContext from './src/context/GlobalContext';
import ShowDetail from './src/screens/ShowDetail';
import Shows from './src/screens/Shows';
import { darkColors, defaultColors } from './src/utils/colors';

// Type checking for navigation
export type AppStackParamList = {
  Shows: undefined;
  ShowDetails: { id: number };
};

const AppStack = createStackNavigator<AppStackParamList>();

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(true);

  function onChangeTheme() {
    setDarkMode(mode => !mode);
  }

  return (
    <GlobalContext.Provider
      value={{
        colors: isDarkMode ? darkColors : defaultColors,
        isDarkMode,
        changeTheme: onChangeTheme,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        animated
        translucent
        backgroundColor="transparent"
      />
      {/* Navigation Routes */}
      <NavigationContainer>
        <AppStack.Navigator headerMode="none">
          <AppStack.Screen name="Shows" component={Shows} />
          <AppStack.Screen name="ShowDetails" component={ShowDetail} />
        </AppStack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};

export default App;
