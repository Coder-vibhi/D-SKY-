import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(checkTouch);
    if (checkTouch) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      // Fast, responsive cursor following
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out'
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.02,
        ease: 'none'
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.3
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.3
      });
    };

    // Hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    
    const onElementEnter = () => setIsHovering(true);
    const onElementLeave = () => setIsHovering(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onElementEnter);
      el.addEventListener('mouseleave', onElementLeave);
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onElementEnter);
        el.removeEventListener('mouseleave', onElementLeave);
      });
    };
  }, []);

  // Update hover effect
  useEffect(() => {
    if (isTouchDevice) return;
    
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.to(cursor, {
      scale: isHovering ? 2 : 1,
      borderColor: isHovering ? '#ff73c3' : 'rgba(255, 115, 195, 0.5)',
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [isHovering, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-pink/50 pointer-events-none z-[9999] mix-blend-difference"
        style={{ opacity: 0 }}
      />
      
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 -ml-0.5 -mt-0.5 bg-pink rounded-full pointer-events-none z-[9999]"
        style={{ opacity: 0 }}
      />
    </>
  );
};

export default CustomCursor;
