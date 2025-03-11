import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    darkMode: false,
    toggleTheme: ()=>{},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [darkMode, setDarkMode] = useState<boolean>(()=>localStorage.getItem("darkMode") === "true");

    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", JSON.stringify(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
} 
    
