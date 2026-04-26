import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({ isFunMode: false, toggleMode: () => {} });

export function ThemeProvider({ children }) {
  const [isFunMode, setIsFunMode] = useState(false);
  function toggleMode() {
    setIsFunMode(prev => !prev);
  }
  return (
    <ThemeContext.Provider value={{ isFunMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
