import React from 'react';
import { type TimerMode } from '../types';

import './ModeSelector.css'

interface ModeSelectorProps {
  mode: TimerMode;
  changeMode: (mode: TimerMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, changeMode }) => {
  return (
    <div className="mode-buttons">
      <button
        className="mode-button"
        aria-selected={mode === 'pomodoro'}
        onClick={() => changeMode('pomodoro')}
      >
        pomodoro
      </button>
      <button
        className="mode-button"
        aria-selected={mode === 'shortBreak'}
        onClick={() => changeMode('shortBreak')}
      >
        short break
      </button>
      <button
        className="mode-button"
        aria-selected={mode === 'longBreak'}
        onClick={() => changeMode('longBreak')}
      >
        long break
      </button>
    </div>
  );
};

export default ModeSelector;
