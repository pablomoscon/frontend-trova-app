import React from 'react';
import { Field, Switch } from '@headlessui/react';
import { ContactSwitchFieldProps } from '../../../Interfaces/ContactInterface';

const SwitchField: React.FC<ContactSwitchFieldProps> = ({
  agreed,
  setAgreed,
}) => (
  <Field className='flex gap-x-4 sm:col-span-2'>
    <div className='flex h-6 items-center'>
      <Switch
        checked={agreed}
        onChange={setAgreed}
        className='group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-checked:bg-indigo-600'
      >
        <span className='sr-only'>Aceptar las políticas</span>
        <span
          aria-hidden='true'
          className='transform rounded-full bg-white shadow-sm ring-0 ring-gray-400 transition duration-200 ease-in-out group-checked:bg-indigo-600 group-checked:ring-2 group-checked:ring-indigo-600'
        />
      </Switch>
    </div>
    <p className='text-sm text-gray-600 pt-10'>
      Al enviar este formulario, aceptas nuestra política de privacidad.
    </p>
  </Field>
);

export default SwitchField;
