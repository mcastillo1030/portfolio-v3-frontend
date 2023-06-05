export const useColorMode = () => useState<string>('colorMode', () => {
  const hasColorMode    = typeof localStorage !== 'undefined' && 'color-mode' in localStorage;
  const colorMode       = hasColorMode ? localStorage.getItem('color-mode') : 'dark';

  return String(colorMode);
});

export const useMenuState = () => useState<string>('menuState', () => 'closed');
