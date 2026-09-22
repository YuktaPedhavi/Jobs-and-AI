import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch / mobile device or coarse pointer
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isCoarse || isTouch);

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(motionQuery.matches);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, select, textarea, [role="button"], [data-cursor-interactive="true"], .cursor-pointer'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth trailing animation loop for the outer ring
  useEffect(() => {
    if (isTouchDevice || reducedMotion) return;

    const animate = () => {
      setPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * 0.25,
          y: prev.y + dy * 0.25
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetPos, isTouchDevice, reducedMotion]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Exact coordinates
  const currentX = reducedMotion ? targetPos.x : pos.x;
  const currentY = reducedMotion ? targetPos.y : pos.y;
  const isDark = theme === 'dark';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer interactive ring */}
      <div
        className="fixed top-0 left-0 rounded-full transition-all ease-out"
        style={{
          width: isHovered ? '36px' : isClicking ? '22px' : '28px',
          height: isHovered ? '36px' : isClicking ? '22px' : '28px',
          transform: `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`,
          borderColor: isHovered
            ? isDark
              ? '#d7e63b' // Subtle lime in dark mode
              : '#1e5bb4' // Cobalt blue in light mode
            : isDark
            ? 'rgba(30, 91, 180, 0.7)' // Cobalt blue
            : 'rgba(6, 19, 41, 0.4)', // Muted navy in light mode
          borderWidth: isHovered ? '1.5px' : '1px',
          borderStyle: 'solid',
          backgroundColor: isHovered
            ? isDark
              ? 'rgba(215, 230, 59, 0.08)'
              : 'rgba(30, 91, 180, 0.06)'
            : 'transparent',
          boxShadow: isHovered && isDark
            ? '0 0 10px rgba(215, 230, 59, 0.2)'
            : 'none',
          transitionProperty: 'width, height, background-color, border-color, box-shadow',
          transitionDuration: '160ms'
        }}
      />

      {/* Center sharp precision dot */}
      <div
        className="fixed top-0 left-0 rounded-full transition-transform duration-75"
        style={{
          width: isClicking ? '5px' : '4px',
          height: isClicking ? '5px' : '4px',
          transform: `translate3d(${targetPos.x}px, ${targetPos.y}px, 0) translate(-50%, -50%)`,
          backgroundColor: isHovered
            ? isDark
              ? '#d7e63b'
              : '#1e5bb4'
            : isDark
            ? '#f7faeb'
            : '#061329'
        }}
      />
    </div>
  );
};
