import { InputFieldProps } from '../../../Interfaces/AuthInterface';

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error,
}) => {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
      />
      {error && <p className='text-red-500 text-sm'>{error}</p>}{' '}
      {/* Error message */}
    </div>
  );
};

export default InputField;
