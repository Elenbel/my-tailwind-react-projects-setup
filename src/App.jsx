import ThemeProvider, { ThemeContext } from './ThemeProvider/ThemeProvider';
import Button from "./components/Button/Button";

import React, { useContext, useState, useEffect, useRef } from "react";
function App() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <main className={`App min-h-screen relative ${isDarkMode ? "bg-custom-blue" : "bg-gray-50"}`}>
      <header className="App-header sm:px-4">
          <Button/>
      </header>
    </main>
  );
}

function AppWrapper() {
  return (
      <ThemeProvider>
        <App />
      </ThemeProvider>
  );
}

export default AppWrapper;
