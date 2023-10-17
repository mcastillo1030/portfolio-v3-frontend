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

export const useAppLoading = () => useState<boolean>('appLoading', () => false);

export const useHeroState = () => useState<string>('heroState', () => 'loading');

export const useLoadingVisibility = () => useState<string>('loadingVisibility', () => 'visible');

// export const useLoadingPhrase = () => useState<string>('loadingPhrase', () => {
//   const phrases = [
//     'Please hold while I finish my coffee...',
//     'Loading the loading screen...',
//     'Generating witty dialog...',
//     'Keep calm and wait...',
//     'Fixing the flux capacitor...',
//     'Wait, do you smell something burning?',
//     'Whatever you do, don\'t look behind you...',
//     'Feel free to spin in circles until I\'m done...',
//     'Updating to Windows Vista...',
//     'You seem like a nice person...',
//     'You are number 2843684714 in the queue...',
//     'TODO: Insert elevator music...',
//   ];
//   return phrases[Math.floor(Math.random() * phrases.length)];
// });