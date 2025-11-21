import React, { useRef, useEffect, useState } from 'react';
import ProgressRing from './ProgressRing';
import './TimerDisplay.css';

interface TimerDisplayProps {
  time: number;
  duration: number;
  paused: boolean;
  onToggle: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, duration, paused, onToggle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: width });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="outer-ring">
      <div className="inner-ring" ref={containerRef}>
        {dimensions.width > 0 && (
          <ProgressRing
            radius={dimensions.width / 2}
            stroke={12}
            progress={(time / duration) * 100}
          />
        )}
        <div className="timer">
          <h1 className="time">
            {Math.floor(time / 60)
              .toString()
              .padStart(2, '0')
              .split('')
              .map((digit, index) => (
                <span key={`min-${digit}-${index}`} className="digit">
                  {digit}
                </span>
              ))}
            <span className="separator">:</span>
            {(time % 60)
              .toString()
              .padStart(2, '0')
              .split('')
              .map((digit, index) => (
                <span key={`sec-${digit}-${index}`} className="digit">
                  {digit}
                </span>
              ))}
          </h1>
          <button className="play-pause-button" onClick={onToggle}>
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
