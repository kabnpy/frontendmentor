import { useState, useEffect, useCallback } from 'react';
import './App.css';
import pomodoroLogo from './assets/logo.svg';
import settingsIcon from './assets/icon-settings.svg';
import Settings from './components/Settings';
import ModeSelector from './components/ModeSelector';
import TimerDisplay from './components/TimerDisplay';
import { useTimer } from './hooks/useTimer';
import { useSettingsStorage } from './hooks/useSettingsStorage';
import { type TimerMode } from './types';

function App() {
  const { settings, setSettings } = useSettingsStorage();

  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(error => console.error('Error playing sound:', error));
  };

  const onFinish = useCallback(() => {
    playNotificationSound();

    if (Notification.permission === 'granted') {
      new Notification('Timer Finished!', {
        body: `${mode === 'pomodoro' ? 'Pomodoro' : 'Break'} is over.`,
        icon: '/192.png'
      });
    }

    console.log('Timer finished');

  }, [mode]);

  const { time, paused, toggle } = useTimer({
    duration: settings.timerDurations[mode],
    mode,
    onFinish,
  });

  useEffect(() => {
    if (!paused && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [paused]);


  useEffect(() => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toString().padStart(2, '0');
    const modeLabel = mode === 'pomodoro' ? 'Pomodoro' : mode === 'shortBreak' ? 'Short Break' : 'Long Break';

    if (paused) {
      document.title = `Pomodoro App`;
    } else {
      document.title = `(${minutes}:${seconds}) ${modeLabel}`;
    }
  }, [time, paused, mode]);

  const applySettings = (
    newFont: string,
    newColor: string,
    pomodoro: number,
    shortBreak: number,
    longBreak: number
  ) => {
    setSettings({
      font: newFont,
      color: newColor,
      timerDurations: {
        pomodoro,
        shortBreak,
        longBreak,
      },
    });
  };

  useEffect(() => {
    document.body.setAttribute('data-font', settings.font);
    document.body.setAttribute('data-color', settings.color);
  }, [settings.font, settings.color]);

  return (
    <>
      <header>
        <div className="app-logo">
          <img src={pomodoroLogo} alt="pomodoro logo" />
        </div>
        <ModeSelector
          mode={mode}
          changeMode={setMode}
        />
      </header>
      <main>
        <TimerDisplay
          time={time}
          duration={settings.timerDurations[mode] * 60}
          paused={paused}
          onToggle={toggle}
        />
        <button className="settings-button" onClick={() => setShowSettingsModal(true)}>
          <img src={settingsIcon} alt="settings" />
        </button>
      </main>

      {showSettingsModal && (
        <Settings
          onClose={() => setShowSettingsModal(false)}
          onApplySettings={applySettings}
          pomodoroDuration={settings.timerDurations.pomodoro}
          shortBreakDuration={settings.timerDurations.shortBreak}
          longBreakDuration={settings.timerDurations.longBreak}
          font={settings.font}
          color={settings.color}
        />
      )}
    </>
  );
}

export default App;
