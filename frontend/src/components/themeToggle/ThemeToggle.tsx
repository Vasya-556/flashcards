import styles from "./ThemeToggle.module.css";
import {
  useState,
  useEffect,
} from 'react';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (localStorage.getItem("theme")){
      return localStorage.getItem("theme") === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark": "light";
  }, [isDarkMode]);

  const toggleTheme = (e: React.BaseSyntheticEvent) => {
    setIsDarkMode(e.target.checked);
    localStorage.setItem("theme", e.target.checked ? "dark" : "light");
  }

  return (
    <div className={styles.container}>
      <label
        className={styles.switch}
      >
        <input
          onChange={toggleTheme}
          defaultChecked={isDarkMode}
          type="checkbox"
          className={styles.toggle}
        />
      </label>
      <div className={styles.sun}></div>
      <div className={styles.moon}></div>
    </div>
  )
}

export default ThemeToggle
