// useScrollRotate.js
import { useState, useEffect } from 'react';

function useScrollRotate() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isDesktopOrLaptop = window.innerWidth > 768;
      if (!isDesktopOrLaptop) return; // Exit if on mobile or tablet

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const rotationAmount = (scrollTop / pageHeight) * 360;
      setRotation(rotationAmount);
    };

    // Initial call to handleScroll to set rotation if needed
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return rotation;
}

export default useScrollRotate;

