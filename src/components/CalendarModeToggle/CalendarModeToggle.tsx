import { useState } from 'react';
import './CalendarModeToggle.scss';
import clsx from 'clsx';

const CalendarModeToggle = () => {
  const [activeMode, setActiveMode] = useState('Week');

  const handleModeChange = (mode: string) => {
    if (mode === 'Month' || mode === 'Day') {
      alert('This feature is coming soon');
    } else {
      setActiveMode(mode);
    }
  };

  return (
    <div className="calendar-mode-toggle">
      {['Month', 'Week', 'Day'].map(mode => (
        <button
          key={mode}
          onClick={() => handleModeChange(mode)}
          className={clsx('calendar-mode-toggle__button', {
            'button-mode': activeMode === mode,
          })}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

export default CalendarModeToggle;
