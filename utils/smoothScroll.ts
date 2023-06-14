import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const scrollTo = (target: string) => {
  if ( !target ) {
    return;
  }

  gsap.registerPlugin(ScrollToPlugin);
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: target,
      offsetY: 100,
    },
    ease: 'power2.inOut',
  });
};

export default scrollTo;