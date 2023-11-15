import React, {useCallback, useMemo, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';
import Toast from 'react-native-toast-message';
import {PreferencesContext} from './src/theme';
import {Router} from './src/router';
import {AuthContextProvider} from './src/provider';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: () => {
        //   console.log('error response: ', error);
        // TODO: 错误兜底拦截
        return false;
      },
    },
    mutations: {
      onError: error => {
        console.log('error response: ', error);
        // TODO: 错误兜底拦截
      },
    },
  },
});

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const App: React.FC = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  // TODO: 可以选择跟随系统还是自定义
  const [isThemeDark, setIsThemeDark] = useState(isDarkMode);
  const theme = useMemo(
    () => (isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme),
    [isThemeDark],
  );
  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <StatusBar
          barStyle={isThemeDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <Router />
            </NavigationContainer>
          </PaperProvider>
        </PreferencesContext.Provider>
      </AuthContextProvider>
      <Toast position="top" />
    </QueryClientProvider>
  );
};

export default App;
