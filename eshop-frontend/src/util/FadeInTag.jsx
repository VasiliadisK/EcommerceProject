import { useEffect, useRef } from 'react';


function useFadeIn() {
  const ref = useRef(null);
  
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
  
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('opacity-100', 'translate-y-0');
            el.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(el);
          }
        },
        { threshold: 0.15 }
      );
  
      observer.observe(el);
      return () => observer.disconnect();
    }, []);
  
    return ref;
  }
  
export default function FadeIn({ children, className = '', delay = '' }) {
    const ref = useFadeIn();
    return (
      <div
        ref={ref}
        className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${delay} ${className}`}
      >
        {children}
      </div>
    );
  }