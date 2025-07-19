import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import PhoneInput from '../PhoneInput/PhoneInput';
import SwitchField from '../SwitchField/SwitchField';

const ContactForm: React.FC = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <form action='#' method='POST' className='mx-auto max-w-4xl sm:mt-10 px-6'>
      <div className='grid grid-cols-1 gap-x-4 sm:grid-cols-2'>
    
        <InputField
          id='first-name'
          label='Nombre'
          type='text'
          name='first-name'
          autoComplete='given-name'
          className='w-full'
        />
        <InputField
          id='last-name'
          label='Apellido'
          type='text'
          name='last-name'
          autoComplete='family-name'
          className='w-full'
        />
      </div>

      <InputField
        id='email'
        label='Correo electrónico'
        type='email'
        name='email'
        autoComplete='email'
        className='w-full mt-6'
      />
      <PhoneInput />

      <InputField
        id='message'
        label='Mensaje'
        type='textarea'
        name='message'
        rows={4}
        className='w-full mt-6'
      />

      <SwitchField agreed={agreed} setAgreed={setAgreed} />

      <button
        type='submit'
        className='mt-6 px-6 py-3 bg-gray-900 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105 w-full'
      >
        Enviar mensaje
      </button>
    </form>
  );
};

export default ContactForm;
