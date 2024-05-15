import { useEffect, useState } from "react";

export const useOnScreen = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let observerRefValue = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        threshold: 1.0,
        rootMargin,
      }
    );

    if (ref?.current) {
      observer.observe(ref.current);
      observerRefValue = ref;
    }

    return () => {
      if (observerRefValue?.current)
        observer.unobserve(observerRefValue.current);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};
