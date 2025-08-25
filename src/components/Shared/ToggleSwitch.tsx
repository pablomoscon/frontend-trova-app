import React from 'react';
import { ToggleSwitchProps } from '../../Interfaces/SharedInterface';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  enabled,
  onToggle,
  ariaLabel,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`relative inline-flex w-9 h-5 transition-colors duration-300 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 ${
        enabled ? 'bg-gray-700/90' : 'bg-gray-300/60'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <span
        className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ease-in-out ${
          enabled ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
