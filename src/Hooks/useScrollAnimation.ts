// useScrollAnimation.ts
import { useState, useEffect, useRef } from 'react';

interface ScrollAnimationHookResult {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

function useScrollAnimation(): ScrollAnimationHookResult {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasTriggered && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Trigger the animation if the element is in the viewport
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          setIsVisible(true);
          setHasTriggered(true); // Set the flag to true to avoid further triggers
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasTriggered]); // Add hasTriggered as a dependency to the useEffect hook

  return { ref, isVisible };
}

export default useScrollAnimation;
