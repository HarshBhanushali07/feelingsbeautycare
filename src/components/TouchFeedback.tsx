import { useEffect } from "react";

export const addTouchFeedback = () => {
  useEffect(() => {
    const addTouchClass = (element: HTMLElement) => {
      element.classList.add('touch-active');
      setTimeout(() => {
        element.classList.remove('touch-active');
      }, 150);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('touch-feedback') || target.closest('.touch-feedback')) {
        const element = target.classList.contains('touch-feedback') ? target : target.closest('.touch-feedback') as HTMLElement;
        addTouchClass(element);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
};

export default addTouchFeedback;