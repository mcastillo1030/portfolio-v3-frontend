export const useColorMode = () => useState<string>('colorMode', () => {
  let colorMode = 'dark';

  if (process.client) {
    const hasColorMode    = typeof localStorage !== 'undefined' && localStorage.getItem('color-mode') !== null;
    colorMode = hasColorMode ? String(localStorage.getItem('color-mode')) : 'dark';
  }

  return colorMode;
});

export const useMenuState = () => useState<string>('menuState', () => 'closed');

export const usePagesConsumed = () => useState<number>('pagesConsumed', () => 0);

export const usePaginationLoading = () => useState<boolean>('isLoading', () => false);

export const useAppLoading = () => useState<boolean>('appLoading', () => false);