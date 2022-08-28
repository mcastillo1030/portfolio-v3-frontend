import { useState, useEffect } from 'react';

type Breakpoint = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type PageBreakpoints = {
  [key in Breakpoint]: string;
}

type PageQueries = {
  [key in Breakpoint]?: MediaQueryList;
}

const usePageBreakpoint = () => {
  const breakpoints: PageBreakpoints = {
    xxs: '320px',
    xs: '375px',
    sm: '550px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',
    xxl: '1600px',
  };
  const mQueries: PageQueries = Object.entries(breakpoints).reduce((acc: PageQueries, [key, value]) => {
    acc[key as Breakpoint] = window.matchMedia(`(min-width: ${value})`);
    return acc;
  }, {});

  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>(Object.keys(mQueries).filter((key) => {
    if (mQueries) {
      mQueries[key as Breakpoint]?.matches
    } else {
      return false;
    }
  })[0] || 'xxs');
};