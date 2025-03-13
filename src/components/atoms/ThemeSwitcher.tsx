import { useState, useEffect } from "react";
import { FaToggleOff, FaToggleOn, FaMoon, FaSun } from "react-icons/fa6";

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
    <div className="flex flex-row items-center justify-between gap-2 text-primary dark:text-text-dark">
      <FaSun />
      <button onClick={toggleTheme} className="text-2xl">
        {isDark ? <FaToggleOn /> : <FaToggleOff />}
      </button>
      <FaMoon />
    </div>
  );
}
