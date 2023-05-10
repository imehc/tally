import {createContext, useContext} from 'react';

export const PreferencesContext = createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});

/**
 * 切换当前主题
 */
export const useThemeContext = () => {
  return useContext(PreferencesContext);
};
