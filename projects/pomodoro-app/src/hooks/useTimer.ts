import { useEffect, useRef, useState, useCallback } from 'react';
import { type TimerMode } from '../types';

interface UseTimerProps {
  duration: number;
  mode: TimerMode;
  onFinish?: () => void;
}

export const useTimer = ({ duration, mode, onFinish }: UseTimerProps) => {
  const [time, setTime] = useState(duration * 60); // Revert to initial duration
  const [paused, setPaused] = useState(true); // Revert to initially paused
  const workerRef = useRef<Worker | null>(null);

  const durationRef = useRef(duration);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../worker.ts', import.meta.url), {
      type: 'module',
    });

    workerRef.current.onmessage = (e) => {
      const { time: newTime, done } = e.data;
      setTime(newTime);
      if (done) {
        setPaused(true);
        if (onFinishRef.current) onFinishRef.current();
        const currentDuration = durationRef.current;
        setTime(currentDuration * 60);
        workerRef.current?.postMessage({ command: 'set', value: currentDuration * 60 });
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []); // Empty dependency array

  // Reset timer when mode or duration changes
  useEffect(() => {
    setPaused(true);
    setTime(duration * 60);
    workerRef.current?.postMessage({ command: 'stop' });
    workerRef.current?.postMessage({ command: 'set', value: duration * 60 });
  }, [mode, duration]);

  const start = useCallback(() => {
    setPaused(false);
    workerRef.current?.postMessage({ command: 'start' });
  }, []);

  const stop = useCallback(() => {
    setPaused(true);
    workerRef.current?.postMessage({ command: 'stop' });
  }, []);

  const toggle = useCallback(() => {
    if (paused) {
      start();
    } else {
      stop();
    }
  }, [paused, start, stop]);

  return { time, paused, start, stop, toggle };
};
