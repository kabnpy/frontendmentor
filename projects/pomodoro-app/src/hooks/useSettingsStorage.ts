import { useState, useEffect } from 'react';

interface AppSettings {
  font: string;
  color: string;
  timerDurations: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
}

const defaultSettings:AppSettings = {
  font: 'Kumbh Sans',
  color: 'red',
  timerDurations: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  },
};

export const useSettingsStorage = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        return {
          font: parsed.font || defaultSettings.font,
          color: parsed.color || defaultSettings.color,
          timerDurations: {
            pomodoro: parsed.timerDurations?.pomodoro || defaultSettings.timerDurations.pomodoro,
            shortBreak: parsed.timerDurations?.shortBreak || defaultSettings.timerDurations.shortBreak,
            longBreak: parsed.timerDurations?.longBreak || defaultSettings.timerDurations.longBreak,
          },
        };
      } catch (e) {
        console.error('Failed to parse settings from localStorage', e);
        localStorage.removeItem('pomodoro-settings');
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  }, [settings]);

  return { settings, setSettings };
};
