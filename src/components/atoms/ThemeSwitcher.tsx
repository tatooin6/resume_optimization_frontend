import { useState, useEffect } from "react";

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleTheme} className="text-primary dark:text-primary">
      Toggle Theme
    </button>
  );
}
