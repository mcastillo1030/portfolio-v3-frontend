import { useState, useEffect } from 'react';

const usePageTheme = () => {
  const [theme, setTheme] = useState('dark-mode');

  useEffect(() => {
    const theme = localStorage.getItem('c-theme') ?? 'dark-mode';
    const body = document.querySelector('body');

    if (theme) {
      setTheme(theme);

      if (body) {
        body.className = theme;
        body.setAttribute('data-theme', theme);
      }
    }
  } , []);

  const toggleTheme = () => {
    const newTheme = theme === 'light-mode' ? 'dark-mode' : 'light-mode';
    const body = document.querySelector('body');
    localStorage.setItem('c-theme', newTheme);
    setTheme(newTheme);

    if (body) {
      body.className = newTheme;
      body.setAttribute('data-theme', newTheme);
    }
  }

  return {
    theme,
    toggleTheme
  };
};

export default usePageTheme;