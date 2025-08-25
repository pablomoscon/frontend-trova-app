import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { countryCodes } from '../../../utils/countryUtils';

const PhoneInput: React.FC = () => (
  <div>
    <label
      htmlFor='phone-number'
      className='block text-sm font-semibold text-gray-900 mt-5'
    >
      Número de Teléfono
    </label>

    <div className='mt-2.5'>
      <div className='flex rounded-md bg-white outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600'>
        <div className='relative'>
          <select
            id='country'
            name='country'
            title='Código de país'
            defaultValue='AR'
            className='appearance-none rounded-l-md py-2 pr-8 pl-3 text-sm text-gray-700 border-r border-gray-300 focus:outline-none'
          >
            {countryCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden='true'
            className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500'
          />
        </div>

        <input
          id='phone-number'
          name='phone-number'
          type='tel'
          placeholder='123-456-7890'
          className='block w-full rounded-r-md py-2 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none'
        />
      </div>
    </div>
  </div>
);

export default PhoneInput;
