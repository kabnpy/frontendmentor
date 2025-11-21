import React, { useState } from 'react';
import closeIcon from '../assets/icon-close.svg';
import './Settings.css';
import NumberInput from './NumberInput';

interface SettingsProps {
  onClose: () => void;
  font: string;
  color: string;
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  onApplySettings: (
    font: string,
    color: string,
    pomodoro: number,
    shortBreak: number,
    longBreak: number
  ) => void;
}

const Settings: React.FC<SettingsProps> = ({
  onClose,
  font: initialFont,
  color: initialColor,
  pomodoroDuration,
  shortBreakDuration,
  longBreakDuration,
  onApplySettings,
}) => {
  const [font, setFont] = useState(initialFont);
  const [color, setColor] = useState(initialColor);
  const [localPomodoroDuration, setLocalPomodoroDuration] = useState(pomodoroDuration);
  const [localShortBreakDuration, setLocalShortBreakDuration] = useState(shortBreakDuration);
  const [localLongBreakDuration, setLocalLongBreakDuration] = useState(longBreakDuration);

  const handleFontChange = (newFont: string) => {
    setFont(newFont);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const applySettings = () => {
    onApplySettings(
      font,
      color,
      localPomodoroDuration,
      localShortBreakDuration,
      localLongBreakDuration
    );
    onClose();
  };

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>Settings</h2>
          <button onClick={onClose} className="close-button">
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        <div className="settings-content">
          <form className="settings-form">
            <div className="duration-settings">
              <h3 className='settings-subtitle'>time (minutes)</h3>
              <div className="duration-options">
                <NumberInput
                  label="pomodoro"
                  id="pomodoro"
                  name="pomodoro"
                  
                  value={localPomodoroDuration}
                  onChange={setLocalPomodoroDuration}
                />
                <NumberInput
                  label="short break"
                  id="short-break"
                  name="short-break"
                  value={localShortBreakDuration}
                  onChange={setLocalShortBreakDuration}
                />
                <NumberInput
                  label="long break"
                  id="long-break"
                  name="long-break"
                  value={localLongBreakDuration}
                  onChange={setLocalLongBreakDuration}
                />
              </div>
            </div>
            <div className="font-settings">
              <h3 className='settings-subtitle'>font</h3>
              <div className="font-options">
                <label
                  className={font === 'Kumbh Sans' ? 'active' : ''}
                  style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
                >
                  <input
                    type="radio"
                    name="font"
                    value="Kumbh Sans"
                    checked={font === 'Kumbh Sans'}
                    onChange={() => handleFontChange('Kumbh Sans')}
                  />
                  <span>Aa</span>
                </label>
                <label
                  className={font === 'Roboto Slab' ? 'active' : ''}
                  style={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  <input
                    type="radio"
                    name="font"
                    value="Roboto Slab"
                    checked={font === 'Roboto Slab'}
                    onChange={() => handleFontChange('Roboto Slab')}
                  />
                  <span>Aa</span>
                </label>
                <label
                  className={font === 'Space Mono' ? 'active' : ''}
                  style={{ fontFamily: 'Space Mono, monospace' }}
                >
                  <input
                    type="radio"
                    name="font"
                    value="Space Mono"
                    checked={font === 'Space Mono'}
                    onChange={() => handleFontChange('Space Mono')}
                  />
                  <span>Aa</span>
                </label>
              </div>
            </div>
            <div className="color-settings">
              <h3 className='settings-subtitle'>colour</h3>
              <div className="color-options">
                <label className={`color-red ${color === 'red' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="color"
                    value="red"
                    checked={color === 'red'}
                    onChange={() => handleColorChange('red')}
                  />
                  <span className="visually-hidden">Red</span>
                </label>
                <label className={`color-blue ${color === 'blue' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="color"
                    value="blue"
                    checked={color === 'blue'}
                    onChange={() => handleColorChange('blue')}
                  />
                  <span className="visually-hidden">Blue</span>
                </label>
                <label className={`color-purple ${color === 'purple' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="color"
                    value="purple"
                    checked={color === 'purple'}
                    onChange={() => handleColorChange('purple')}
                  />
                  <span className="visually-hidden">Purple</span>
                </label>
              </div>
            </div>
          </form>
          <button type="button" className="apply-button" onClick={applySettings}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
