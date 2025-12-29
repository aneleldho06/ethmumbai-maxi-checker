import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  onComplete?: () => void;
}

export function AnimatedCounter({
  value,
  duration = 1000,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  onComplete,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const startAnimation = () => {
      setIsAnimating(true);
      startTimeRef.current = null;

      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic for satisfying feel
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * value);
        
        setDisplayValue(current);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
          setIsAnimating(false);
          onComplete?.();
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration, delay, onComplete]);

  return (
    <span className={`tabular-nums ${isAnimating ? 'animate-pulse-slow' : ''} ${className}`}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}
