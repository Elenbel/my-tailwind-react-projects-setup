import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const storedMode = localStorage.getItem("themeMode");
            if (storedMode === "dark") {
                setIsDarkMode(true);
            } else if (storedMode === "light") {
                setIsDarkMode(false);
            } else {
                const userPrefersDark = window.matchMedia("prefers-color-scheme: dark").matches;
                setIsDarkMode(userPrefersDark);
            }
        } catch (error) {
            // Handle local storage access error
            console.error("Couldn't access localstorage:", error);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                const rootElement = window.document.documentElement;
                if (isDarkMode) {
                    rootElement.classList.add("dark");
                    localStorage.setItem("themeMode", "dark");
                } else {
                    rootElement.classList.remove("dark");
                    localStorage.setItem("themeMode", "light");
                }
            } catch (error) {
                // Handle local storage access error
                console.error("Couldn't access localstorage:", error)
            }
        }
    }, [isDarkMode, isLoaded]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {isLoaded && children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
