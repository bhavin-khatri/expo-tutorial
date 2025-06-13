import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Colors } from "@/ui/Colors";
import { getItemFromAsync, loadFonts, setItemAsync } from "../../utils/MethodUtils";
import StorageConstants from "../../constants/StorageConstants";
import { AppThemes } from "../../constants/AppConstants"; // Adjust the import based on your structure

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
  colors: typeof Colors.light | typeof Colors.dark;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>(AppThemes.LIGHT); // Default theme

  useEffect(() => {
    const loadTheme = async () => {
      loadFonts();
      let savedTheme = await getItemFromAsync(StorageConstants.KEY_APP_THEME);
      savedTheme = JSON.parse(savedTheme);
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme =
      theme === AppThemes.LIGHT ? AppThemes.DARK : AppThemes.LIGHT;
    setTheme(newTheme);
    await setItemAsync(StorageConstants.KEY_APP_THEME, newTheme);
  };

  const colors = theme === AppThemes.DARK ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
