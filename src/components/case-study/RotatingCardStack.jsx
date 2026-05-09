import { useEffect, useState } from 'react';

export default function RotatingCardStack({
  items,
  interval = 5600,
  getPositionClassName,
  renderItem,
  className,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, isPaused, items.length]);

  return (
    <div
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      {items.map((item, index) => {
        const position = (index - activeIndex + items.length) % items.length;

        return renderItem({
          item,
          index,
          position,
          tabIndex: position === 0 ? 0 : -1,
          positionClassName: getPositionClassName(position),
        });
      })}
    </div>
  );
}
