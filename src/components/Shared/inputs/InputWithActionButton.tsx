import React from 'react';

interface InputWithActionButtonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
  placeholder?: string;
  className?: string;
  isEmptyIcon?: React.ReactNode; 
  hasValueIcon?: React.ReactNode; 
}

const InputWithActionButton: React.FC<InputWithActionButtonProps> = ({
  value,
  onChange,
  onEnter,
  onButtonClick,
  placeholder = '',
  className = '',
  isEmptyIcon,
  hasValueIcon,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) onEnter(e);
  };

  const handleClick = () => {
    if (onButtonClick) onButtonClick();
  };

  return (
    <div className={className}>
      <div className='relative'>
        <input
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className='w-full p-1 pr-10 rounded-md border border-gray-300 focus:outline-none'
        />
        <button
          type='button'
          onClick={handleClick}
          className='absolute top-1/2 right-2 transform -translate-y-1/2'
        >
          {value ? hasValueIcon : isEmptyIcon}
        </button>
      </div>
    </div>
  );
};

export default InputWithActionButton;
