import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const scrollToTop = () => {
  gsap.registerPlugin(ScrollToPlugin);
  gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut'});
};

export default scrollToTop;