/* Import react & hooks */
import { ReactNode, useState, useEffect, useMemo } from 'react';

/* Import ultils */
import usePageTheme from '../../lib/hooks/usePageTheme';
import { getClassNames } from '../../lib/utils';

/* Import packages */
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/dist/MorphSVGPlugin';
import debounce from 'lodash.debounce';

/* Import styles */
import styles from './Header.module.scss';

type Props = {
  children: ReactNode | null,
};

const Header = ({children}: Props) => {
  const { toggleTheme } = usePageTheme();
  const [isOpen, setIsOpen] = useState(false);

  /* Register GSAP Plugins */
  gsap.registerPlugin(MorphSVGPlugin);

  /**
   * Open the menu drawer.
   */
  const openMenu = () => {
    const nav = document.querySelector(`.${styles['header__nav']}`);
    gsap.to(nav, {
      insetInlineStart: '0',
      onStart: () => {
        setIsOpen(true);
      },
    })
  };

  /**
   * Close the menu drawer.
   */
  const closeMenu = () => {
    const nav = document.querySelector(`.${styles['header__nav']}`);
    gsap.to(nav, {
      insetInlineStart: '100%',
      onComplete: () => {
        setIsOpen(false);
      }
    })
  };

  /**
   * Handle the click event on the menu overlay,
   * outside the menu drawer.
   *
   * @param e - The click event object.
   */
  const clickOverlayHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  /**
   * Helper class name generator.
   *
   * @param classNames - A list of class names to stringify.
   * @returns A stringified class name list.
   */
  const printHeaderClass = (...classNames: string[]) => {
    return getClassNames(styles, ...classNames);
  };

  /**
   * Debounced handler to remove inline
   * styles from the menu drawer @ breakpoint.
   */
  const dbMenuHandler = useMemo(() => debounce(
    (e: MediaQueryListEvent) => {
      const nav = document.querySelector(`.${styles['header__nav']}`);
      if (e.matches) {
        nav?.removeAttribute('style');
      }
    },
    500
  ), []);

  /**
   * Debounced handler to animate the
   * logo @ breakpoint.
   */
  const dbLogoHandler = useMemo(() => debounce(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const logo = document.querySelector(`.${styles['header__logo--lg']}`);
      const letters = logo?.querySelectorAll(`.${styles['header__logo-letter']}`);
      const visibleC = logo?.querySelector(`.${styles['header__logo-letter--init']}`);
      const hiddenC: SVGPathElement | null | undefined = logo?.querySelector(`.${styles['header__logo-letter--c']}:not(.${styles['header__logo-letter--init']})`);
      const visibleTerminal = logo?.querySelector(`.${styles['header__logo-terminal--init']}`);
      const hiddenTerminal: SVGPathElement | null | undefined = logo?.querySelector(`.${styles['header__logo-terminal']}:not(.${styles['header__logo-terminal--init']})`);
      const allInDom = visibleC && hiddenC && letters && visibleTerminal && hiddenTerminal;

      if (!allInDom) {
        return;
      }

      const logoTl = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'sine.out',
        },
        onComplete: () => {
          Array.from(letters).forEach((letter) => {
            letter.classList.add(styles['header__logo-letter--end']);
            letter.removeAttribute('style');
          });
          [hiddenTerminal, visibleTerminal].forEach((terminal) => {
            terminal.classList.add(styles['header__logo-terminal--end']);
            terminal.removeAttribute('style');
          });
        }
      })
        .addLabel('start')
        .to(visibleC, {
          morphSVG: {
            shape: hiddenC,
          },
        })
        .to(visibleTerminal, {
          morphSVG: {
            shape: hiddenTerminal,
          },
        }, '<start')
        .set(letters, {
          opacity: 1,
          stagger: 0.1,
        }, '>start');

      if (e.matches) {
        logoTl.play(0);
      } else {
        logoTl.kill();
        Array.from(letters).forEach((letter) => {
          const wasEnd = letter.classList.contains(styles['header__logo-letter--end']);

          if (wasEnd) {
            letter.classList.remove(styles['header__logo-letter--end']);
            letter.removeAttribute('style');
          }
        });
        [hiddenTerminal, visibleTerminal].forEach((terminal) => {
          const wasEnd = terminal.classList.contains(styles['header__logo-terminal--end']);

          if (wasEnd) {
            terminal.classList.remove(styles['header__logo-terminal--end']);
            terminal.removeAttribute('style');
          }
        });
        [visibleC, visibleTerminal].forEach((morphed) => {
          const originalPath = morphed.getAttribute('data-original');

          if (originalPath && originalPath.length > 0) {
            morphed.setAttribute('d', originalPath);
            morphed.removeAttribute('data-original');
          }
        });
      }
    },
    500
  ), []);

  useEffect(() => {
    const mediumQuery = window.matchMedia('(min-width: 840px)');
    const logoQuery = window.matchMedia('(min-width: 1440px)');

    mediumQuery.addEventListener('change', dbMenuHandler);
    logoQuery.addEventListener('change', dbLogoHandler);
    dbLogoHandler(logoQuery);
    return () => {
      dbMenuHandler.cancel();
      dbLogoHandler.cancel();
    };
  }, [dbMenuHandler, dbLogoHandler]);

  return (
    <header className={printHeaderClass('header')}>
      <div className={`${printHeaderClass('header__container')} container`}>
        <div className={printHeaderClass('header__inner')}>
          <h1 className={printHeaderClass('header__logo-wrap')}>
            <span className={printHeaderClass('header__logo-title')}>Marlon Castillo</span>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 408.21 33.47' className={printHeaderClass('header__logo', 'header__logo--lg')}>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--m')} d='M21.65,16.52v16.39h-4.16v-15.77c0-2.3-.17-3.26-1.47-3.26-1.09,0-2.18,.63-3.27,2.21v16.82h-3.82v-15.77c0-2.3-.17-3.26-1.47-3.26-1.13,0-2.18,.63-3.27,2.21v16.82H0V10.84H3.52l.34,2.38c1.26-1.76,2.6-2.97,4.74-2.97,1.68,0,3.15,.71,3.78,2.81,1.26-1.67,2.73-2.81,4.87-2.81,2.52,0,4.41,1.38,4.41,6.27Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--c', 'header__logo-letter--init')} d='M44.24,27.73l2.14,3.01c-1.93,1.63-4.82,2.72-7.76,2.72-6.84,0-10.78-4.56-10.78-11.46s4.03-11.75,10.87-11.75c3.02,0,5.54,.92,7.68,2.68l-2.18,2.93c-1.72-1.17-3.52-1.84-5.41-1.84-3.53,0-5.96,2.47-5.96,7.99s2.51,7.61,5.96,7.61c2.06,0,3.82-.79,5.46-1.88Z'/>
              <path className={printHeaderClass('header__logo-terminal', 'header__logo-terminal--init')} d='M75.16,24.71V13.89c0-1.97-1.6-3.57-3.58-3.57h-15.43c-1.98,0-3.58,1.6-3.58,3.57v15.38c0,1.97,1.6,3.57,3.58,3.57h15.43c1.98,0,3.58-1.6,3.58-3.57v-2.06h-10.05v-2.5h10.05Zm-17.58,2.5l-1.82-1.79,3.81-3.8-3.88-3.87,1.81-1.8,5.69,5.67-5.61,5.59Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--a')} d='M45.79,30.29l-1.09,3.18c-2.14-.25-3.78-1.13-4.57-3.06-1.63,2.05-4.24,3.06-7.05,3.06-4.53,0-7.3-2.76-7.3-6.86,0-4.6,3.78-7.23,10.53-7.23h3.15v-1.42c0-2.89-1.81-4.01-4.91-4.01-1.47,0-3.65,.34-5.87,1.13l-1.17-3.31c2.77-1.04,5.5-1.51,7.77-1.51,5.95,0,8.85,2.76,8.85,7.4v9.87c0,1.71,.5,2.38,1.68,2.76h0Zm-6.33-3.1v-4.89h-2.6c-4.41,0-6.13,1.55-6.13,4.14,0,2.34,1.26,3.6,3.73,3.6,1.93,0,3.9-1.04,4.99-2.84h0Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--r')} d='M71.4,10.84l-.8,8.15h-3.36v-4.52c-3.15,.09-5.42,2.59-6.71,6.9v8.2h4.45v3.35h-12.42v-3.35h3.27V14.19h-3.27v-3.35h6.84l.84,5.1c1.68-3.68,3.98-5.65,7.8-5.65,1.34,0,2.35,.21,3.36,.54Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--l')} d='M87.28,26.9c0,2.05,1.38,2.81,3.36,2.81,1.25,0,2.39-.29,3.52-.75l1.17,3.26c-1.3,.71-3.23,1.26-5.71,1.26-4.45,0-7.05-2.63-7.05-6.98V5.4h-6.67V1.97h11.37V26.9Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--o')} d='M121.62,21.84c0,7.03-3.61,11.63-10.03,11.63s-10.03-4.43-10.03-11.58,3.61-11.63,10.07-11.63,9.99,4.56,9.99,11.58Zm-15.1,.04c0,5.48,1.68,7.99,5.08,7.99s5.08-2.51,5.08-8.03-1.68-7.95-5.04-7.95-5.12,2.51-5.12,7.99h0Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--n')} d='M127.92,10.84h4.07l.34,2.89c1.85-2.26,4.49-3.47,7.18-3.47,4.11,0,6.17,2.43,6.17,6.56v16.1h-4.7v-13.76c0-3.85-.46-5.31-3.15-5.31-2.18,0-4.03,1.55-5.2,3.22v15.85h-4.7V10.84h0Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--c')} d='M185.74,27.73l2.14,3.01c-1.93,1.63-4.82,2.72-7.76,2.72-6.84,0-10.78-4.56-10.78-11.46s4.03-11.75,10.87-11.75c3.02,0,5.54,.92,7.68,2.68l-2.18,2.93c-1.72-1.17-3.52-1.84-5.41-1.84-3.53,0-5.96,2.47-5.96,7.99s2.51,7.61,5.96,7.61c2.06,0,3.82-.79,5.46-1.88Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--a')} d='M213.4,30.29l-1.09,3.18c-2.14-.25-3.78-1.13-4.57-3.06-1.63,2.05-4.24,3.06-7.05,3.06-4.53,0-7.3-2.76-7.3-6.86,0-4.6,3.78-7.23,10.53-7.23h3.15v-1.42c0-2.89-1.81-4.01-4.91-4.01-1.47,0-3.65,.34-5.87,1.13l-1.18-3.31c2.77-1.04,5.49-1.51,7.76-1.51,5.96,0,8.85,2.76,8.85,7.4v9.87c0,1.71,.5,2.38,1.68,2.76h0Zm-6.33-3.1v-4.89h-2.6c-4.41,0-6.13,1.55-6.13,4.14,0,2.34,1.26,3.6,3.73,3.6,1.93,0,3.9-1.04,4.99-2.84h0Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--s')} d='M232.8,26.94c0-1.8-.71-2.63-5.29-3.81-4.41-1.13-7.3-2.68-7.3-6.52s3.4-6.36,8.85-6.36c3.73,0,6.42,1.09,8.43,2.55l-2.01,2.97c-1.72-1.13-3.69-1.96-6.29-1.96-3.02,0-4.2,.96-4.2,2.43,0,1.67,1.22,2.3,5.62,3.51,4.32,1.17,7.18,2.68,7.18,6.86,0,4.81-4.7,6.86-9.78,6.86-4.11,0-7.05-1.34-9.11-3.09l2.48-2.85c1.72,1.38,4.03,2.38,6.63,2.38,2.94,0,4.79-1.13,4.79-2.97h0Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--t')} d='M257.2,33.47c-5.16,0-7.89-2.88-7.89-7.23V14.27h-4.91v-3.43h4.91V5.9l4.7-.54v5.48h7.51l-.55,3.43h-6.96v11.92c0,2.38,1.13,3.51,3.86,3.51,1.59,0,2.98-.42,4.11-1.04l1.68,3.09c-1.63,1.04-3.98,1.71-6.46,1.71h0Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--i')} d='M282.43,29.49h6.04v3.43h-17.33v-3.43h6.58V14.27h-6.38v-3.43h11.08V29.49h0Zm-.16-26.52c0,1.67-1.26,2.93-3.07,2.93s-3.07-1.26-3.07-2.93,1.22-2.97,3.07-2.97,3.07,1.3,3.07,2.97Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--l')} d='M305.27,26.9c0,2.05,1.38,2.81,3.36,2.81,1.26,0,2.39-.29,3.52-.75l1.17,3.26c-1.3,.71-3.23,1.26-5.71,1.26-4.45,0-7.05-2.63-7.05-6.98V5.4h-6.67V1.97h11.37V26.9Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--l')} d='M330.46,26.9c0,2.05,1.38,2.81,3.36,2.81,1.26,0,2.39-.29,3.52-.75l1.18,3.26c-1.3,.71-3.23,1.26-5.71,1.26-4.45,0-7.05-2.63-7.05-6.98V5.4h-6.67V1.97h11.37V26.9Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--o')} d='M364.8,21.84c0,7.03-3.61,11.63-10.03,11.63s-10.03-4.43-10.03-11.58,3.61-11.63,10.07-11.63,9.99,4.56,9.99,11.58Zm-15.1,.04c0,5.48,1.68,7.99,5.08,7.99s5.08-2.51,5.08-8.03-1.68-7.95-5.04-7.95-5.12,2.51-5.12,7.99h0Z'/>
              <path className={printHeaderClass('header__logo-terminal')} d='M408.21,24.71V13.89c0-1.97-1.6-3.57-3.58-3.57h-15.43c-1.98,0-3.58,1.6-3.58,3.57v15.38c0,1.97,1.61,3.57,3.58,3.57h15.43c1.98,0,3.58-1.6,3.58-3.57v-2.06h-10.05v-2.5h10.05Zm-17.58,2.5l-1.82-1.79,3.81-3.8-3.88-3.87,1.81-1.8,5.69,5.67-5.61,5.59Z'/>
            </svg>
            <svg className={printHeaderClass('header__logo', 'header__logo--sm')} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100.24 32'>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--m')} d='M29.11,8.92V31.25h-5.59V9.77c0-3.13-.22-4.44-1.97-4.44-1.47,0-2.94,.86-4.4,3.02V31.26h-5.14V9.77c0-3.13-.22-4.44-1.97-4.44-1.52,0-2.94,.86-4.4,3.02V31.26H0V1.17H4.74l.45,3.25C6.89,2.03,8.69,.37,11.57,.37c2.25,0,4.23,.97,5.08,3.82,1.69-2.28,3.67-3.82,6.55-3.82,3.39,0,5.92,1.88,5.92,8.55h-.01Z'/>
              <path className={printHeaderClass('header__logo-letter', 'header__logo-letter--c')} d='M58.61,24.19l2.88,4.11c-2.59,2.23-6.49,3.7-10.44,3.7-9.2,0-14.5-6.21-14.5-15.62S41.97,.37,51.17,.37c4.07,0,7.45,1.25,10.33,3.65l-2.94,3.99c-2.31-1.6-4.74-2.5-7.28-2.5-4.74,0-8.01,3.36-8.01,10.89s3.38,10.37,8.01,10.37c2.76,0,5.13-1.08,7.34-2.57h0Z'/>
              <path className={printHeaderClass('header__logo-terminal')} d='M86.33,23.72v-3.51h13.91V4.91c0-2.71-2.18-4.91-4.86-4.91h-21.59c-2.68,0-4.86,2.2-4.86,4.91V26.71c0,2.71,2.18,4.91,4.86,4.91h21.59c2.69,0,4.86-2.2,4.86-4.91v-2.99h-13.91Zm-10.44,0h0s-2.52-2.52-2.52-2.52l5.28-5.34-5.38-5.43,2.5-2.53,7.88,7.96-7.76,7.85h0Z'/>
            </svg>
          </h1>
          {children && (
            <nav
              className={`${styles['header__nav']} ${!isOpen ? styles['header__nav--closed'] : ''}`}
              onClick={clickOverlayHandler}
            >
              <div className={printHeaderClass('header__nav-inner')}>
                <button type='button' className={printHeaderClass('header__nav-close')} onClick={closeMenu}>
                  <span className={printHeaderClass('header__toggle-label')}>Close Navigation</span>
                  <svg className={printHeaderClass('header__toggle-icon')} viewBox='0 0 32 32'>
                    <path d='M12 26.667h-5.333c-0.368 0-0.7-0.148-0.943-0.391s-0.391-0.575-0.391-0.943v-18.667c0-0.368 0.148-0.7 0.391-0.943s0.575-0.391 0.943-0.391h5.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-5.333c-1.104 0-2.107 0.449-2.828 1.172s-1.172 1.724-1.172 2.828v18.667c0 1.104 0.449 2.107 1.172 2.828s1.724 1.172 2.828 1.172h5.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333zM24.781 14.667h-12.781c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333h12.781l-4.391 4.391c-0.521 0.521-0.521 1.365 0 1.885s1.365 0.521 1.885 0l6.667-6.667c0.123-0.123 0.221-0.269 0.289-0.432 0.2-0.483 0.104-1.060-0.289-1.453l-6.667-6.667c-0.521-0.521-1.365-0.521-1.885 0s-0.521 1.365 0 1.885z'></path>
                  </svg>
                </button>
                <h2 className={`${printHeaderClass('header__nav-title')} delta`}>Navigation</h2>
                <ul className={printHeaderClass('header__nav-list')}>
                  {children}
                </ul>
              </div>
            </nav>
          )}
          <div className={printHeaderClass('header__nav-triggers')}>
            <button type='button' className={printHeaderClass('header__theme-toggle')} onClick={toggleTheme}>
              <span className={printHeaderClass('header__toggle-label')}>Toggle Page Theme</span>
              <svg width='23' height='24' viewBox='0 0 23 24' xmlns='http://www.w3.org/2000/svg' className={printHeaderClass('header__toggle-icon', 'header__toggle-icon--moon')}>
                <path d='M9 0.416929C9.14642 0.594848 9.23612 0.812587 9.25751 1.04201C9.27891 1.27144 9.231 1.50201 9.12 1.70393C8.25279 3.29614 7.7999 5.08087 7.803 6.89393C7.803 12.9254 12.72 17.8094 18.78 17.8094C19.5705 17.8094 20.34 17.7269 21.0795 17.5694C21.3062 17.5203 21.5423 17.5391 21.7584 17.6234C21.9745 17.7077 22.1609 17.8538 22.2945 18.0434C22.4355 18.2406 22.5074 18.4788 22.499 18.7211C22.4905 18.9633 22.4023 19.196 22.248 19.3829C21.0715 20.8281 19.5874 21.9925 17.9038 22.7912C16.2201 23.5899 14.3795 24.0029 12.516 23.9999C5.601 23.9999 0 18.4289 0 11.5649C0 6.39893 3.171 1.96793 7.686 0.089929C7.91091 -0.00512327 8.16058 -0.0246323 8.39753 0.0343324C8.63447 0.0932972 8.84588 0.227552 9 0.416929V0.416929Z'/>
              </svg>
              <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={printHeaderClass('header__toggle-icon', 'header__toggle-icon--sun')}>
                <path className={printHeaderClass('header__icon-center')} d='M12 6.54546C10.5534 6.54546 9.16598 7.12013 8.14306 8.14306C7.12013 9.16598 6.54546 10.5534 6.54546 12C6.54546 13.4466 7.12013 14.834 8.14306 15.8569C9.16598 16.8799 10.5534 17.4545 12 17.4545C13.4466 17.4545 14.834 16.8799 15.8569 15.8569C16.8799 14.834 17.4545 13.4466 17.4545 12C17.4545 10.5534 16.8799 9.16598 15.8569 8.14306C14.834 7.12013 13.4466 6.54546 12 6.54546Z'/>
                <path className={printHeaderClass('header__icon-rays')} fillRule='evenodd' clipRule='evenodd' d='M12 0C12.2893 0 12.5668 0.114935 12.7714 0.31952C12.976 0.524105 13.0909 0.801582 13.0909 1.09091V2.18182C13.0909 2.47115 12.976 2.74862 12.7714 2.95321C12.5668 3.15779 12.2893 3.27273 12 3.27273C11.7107 3.27273 11.4332 3.15779 11.2286 2.95321C11.024 2.74862 10.9091 2.47115 10.9091 2.18182V1.09091C10.9091 0.801582 11.024 0.524105 11.2286 0.31952C11.4332 0.114935 11.7107 0 12 0ZM2.50145 2.50145C2.70603 2.29694 2.98346 2.18205 3.27273 2.18205C3.562 2.18205 3.83942 2.29694 4.044 2.50145L5.68036 4.13782C5.87908 4.34357 5.98904 4.61913 5.98655 4.90517C5.98407 5.1912 5.86934 5.46481 5.66707 5.66707C5.46481 5.86934 5.1912 5.98407 4.90517 5.98655C4.61913 5.98904 4.34357 5.87908 4.13782 5.68036L2.50145 4.044C2.29694 3.83942 2.18205 3.562 2.18205 3.27273C2.18205 2.98346 2.29694 2.70603 2.50145 2.50145ZM21.4985 2.50145C21.7031 2.70603 21.8179 2.98346 21.8179 3.27273C21.8179 3.562 21.7031 3.83942 21.4985 4.044L19.8622 5.68036C19.7616 5.78456 19.6412 5.86766 19.5081 5.92484C19.375 5.98201 19.2318 6.01211 19.087 6.01336C18.9421 6.01462 18.7985 5.98702 18.6644 5.93217C18.5303 5.87732 18.4085 5.79631 18.3061 5.69389C18.2037 5.59146 18.1227 5.46966 18.0678 5.33559C18.013 5.20152 17.9854 5.05787 17.9866 4.91302C17.9879 4.76817 18.018 4.62502 18.0752 4.49192C18.1323 4.35883 18.2154 4.23845 18.3196 4.13782L19.956 2.50145C20.1606 2.29694 20.438 2.18205 20.7273 2.18205C21.0165 2.18205 21.294 2.29694 21.4985 2.50145ZM0 12C0 11.7107 0.114935 11.4332 0.31952 11.2286C0.524105 11.024 0.801582 10.9091 1.09091 10.9091H2.18182C2.47115 10.9091 2.74862 11.024 2.95321 11.2286C3.15779 11.4332 3.27273 11.7107 3.27273 12C3.27273 12.2893 3.15779 12.5668 2.95321 12.7714C2.74862 12.976 2.47115 13.0909 2.18182 13.0909H1.09091C0.801582 13.0909 0.524105 12.976 0.31952 12.7714C0.114935 12.5668 0 12.2893 0 12ZM20.7273 12C20.7273 11.7107 20.8422 11.4332 21.0468 11.2286C21.2514 11.024 21.5289 10.9091 21.8182 10.9091H22.9091C23.1984 10.9091 23.4759 11.024 23.6805 11.2286C23.8851 11.4332 24 11.7107 24 12C24 12.2893 23.8851 12.5668 23.6805 12.7714C23.4759 12.976 23.1984 13.0909 22.9091 13.0909H21.8182C21.5289 13.0909 21.2514 12.976 21.0468 12.7714C20.8422 12.5668 20.7273 12.2893 20.7273 12ZM5.68036 18.3196C5.88488 18.5242 5.99977 18.8016 5.99977 19.0909C5.99977 19.3802 5.88488 19.6576 5.68036 19.8622L4.044 21.4985C3.83825 21.6973 3.56269 21.8072 3.27665 21.8047C2.99062 21.8023 2.71701 21.6875 2.51474 21.4853C2.31248 21.283 2.19775 21.0094 2.19526 20.7233C2.19278 20.4373 2.30274 20.1617 2.50145 19.956L4.13782 18.3196C4.34239 18.1151 4.61982 18.0002 4.90909 18.0002C5.19836 18.0002 5.47579 18.1151 5.68036 18.3196ZM18.3196 18.3196C18.5242 18.1151 18.8016 18.0002 19.0909 18.0002C19.3802 18.0002 19.6576 18.1151 19.8622 18.3196L21.4985 19.956C21.6973 20.1617 21.8072 20.4373 21.8047 20.7233C21.8023 21.0094 21.6875 21.283 21.4853 21.4853C21.283 21.6875 21.0094 21.8023 20.7233 21.8047C20.4373 21.8072 20.1617 21.6973 19.956 21.4985L18.3196 19.8622C18.1151 19.6576 18.0002 19.3802 18.0002 19.0909C18.0002 18.8016 18.1151 18.5242 18.3196 18.3196ZM12 20.7273C12.2893 20.7273 12.5668 20.8422 12.7714 21.0468C12.976 21.2514 13.0909 21.5289 13.0909 21.8182V22.9091C13.0909 23.1984 12.976 23.4759 12.7714 23.6805C12.5668 23.8851 12.2893 24 12 24C11.7107 24 11.4332 23.8851 11.2286 23.6805C11.024 23.4759 10.9091 23.1984 10.9091 22.9091V21.8182C10.9091 21.5289 11.024 21.2514 11.2286 21.0468C11.4332 20.8422 11.7107 20.7273 12 20.7273Z'/>
              </svg>
            </button>
            <button type='button' className={printHeaderClass('header__menu-toggle')} onClick={openMenu}>
              <span className={printHeaderClass('header__toggle-label')}>Toggle Menu</span>
              <svg className={printHeaderClass('header__toggle-icon', 'header__toggle-icon--menu')} width='35' height='24' viewBox='0 0 34.29 24' xmlns='http://www.w3.org/2000/svg'>
                <path className={printHeaderClass('header__icon-bar', 'header__icon-bar--top')} d='M32.58,3.41c.45,0,.89-.18,1.21-.5,.32-.32,.5-.75,.5-1.21s-.18-.89-.5-1.21C33.47,.18,33.03,0,32.58,0H11.99c-.22,0-.45,.04-.65,.13-.21,.09-.4,.21-.55,.37-.16,.16-.28,.35-.37,.55-.09,.21-.13,.43-.13,.65s.04,.45,.13,.65c.09,.21,.21,.39,.37,.55,.16,.16,.35,.28,.55,.37,.21,.09,.43,.13,.65,.13h20.59Z'/>
                <path className={printHeaderClass('header__icon-bar', 'header__icon-bar--middle')} d='M34.29,12c0,.94-.76,1.71-1.71,1.71H1.71c-.45,0-.89-.18-1.21-.5-.32-.32-.5-.75-.5-1.21s.18-.89,.5-1.21c.32-.32,.75-.5,1.21-.5h30.87c.94,0,1.71,.76,1.71,1.71Z'/>
                <path className={printHeaderClass('header__icon-bar', 'header__icon-bar--bottom')} d='M34.29,22.29c0,.94-.76,1.71-1.71,1.71h-13.73c-.45,0-.89-.18-1.21-.5-.32-.32-.5-.75-.5-1.21s.18-.89,.5-1.21c.32-.32,.75-.5,1.21-.5h13.73c.94,0,1.71,.76,1.71,1.71Z'/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;