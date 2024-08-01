import React, { useContext, useEffect, useState } from "react";

type ThemeContext = {
  primaryTheme: boolean;
  changePrimaryTheme: (primaryTheme: boolean) => void;
  secondaryTheme: boolean;
  changeSecondaryTheme: (secondaryTheme: boolean) => void;
  changeAttributes: (primary: boolean, secondary: boolean) => void;
};

const ThemeContext = React.createContext<ThemeContext | undefined>(undefined);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPrimaryTheme, setIsPrimaryTheme] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [isSecondaryTheme, setIsSecondaryTheme] = useState<boolean>(false);

  function setThemeAttributes(primary: boolean, secondary: boolean) {
    const html = document.querySelector("html");
    html?.setAttribute("data-primary-theme", primary ? "dark" : "light");
    html?.setAttribute("data-secondary-theme", secondary ? "minimal" : "sweet");
  }

  useEffect(() => {
    setThemeAttributes(isPrimaryTheme, isSecondaryTheme);
  }, [setThemeAttributes, isPrimaryTheme, isSecondaryTheme]);

  return (
    <ThemeContext.Provider
      value={{
        primaryTheme: isPrimaryTheme,
        changePrimaryTheme: setIsPrimaryTheme,
        secondaryTheme: isSecondaryTheme,
        changeSecondaryTheme: setIsSecondaryTheme,
        changeAttributes: setThemeAttributes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context as ThemeContext;
};
