import React from 'react';
import './NumberInput.css';

interface NumberInputProps {
  label: string;
  id: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, id, name, value, onChange, min = 1 }) => {
  const increment = () => {
    onChange(value + 1);
  };

  const decrement = () => {
    onChange(Math.max(min, value - 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (num >= min) {
      onChange(num);
    }
  };

  return (
    <div className='number-input'>
      <label htmlFor={id}>{label}</label>
      <div className="number-input__wrapper">
        <input type="number" name={name} id={id} value={value} min={min} onChange={handleChange} />
        <button type="button" onClick={increment}>
          <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="7">
            <path
              fill="none"
              stroke="currentColor"
              strokeOpacity=".25"
              strokeWidth="2"
              d="M1 6l6-4 6 4"
            />
          </svg>
        </button>
        <button type="button" onClick={decrement}>
          <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="7">
            <path
              fill="none"
              stroke="currentColor"
              strokeOpacity=".25"
              strokeWidth="2"
              d="M1 1l6 4 6-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
