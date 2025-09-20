import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import PhoneInput from '../PhoneInput/PhoneInput';
import SwitchField from '../SwitchField/SwitchField';
import { useContactForm } from '../../../hooks/email/useContactForm';

const ContactForm: React.FC = () => {
  const { form, handleChange, handleSubmit, loading } = useContactForm();
  const [agreed, setAgreed] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
        setAgreed(false);
      }}
      className='mx-auto max-w-4xl sm:mt-10 px-6'
    >
      <div className='grid grid-cols-1 gap-x-4 sm:grid-cols-2'>
        <InputField
          id='first-name'
          label='Nombre'
          type='text'
          name='firstName'
          value={form.firstName}
          onChange={handleChange}
          autoComplete='given-name'
          className='w-full'
        />
        <InputField
          id='last-name'
          label='Apellido'
          type='text'
          name='lastName'
          value={form.lastName || ''}
          onChange={handleChange}
          autoComplete='family-name'
          className='w-full'
        />
      </div>

      <InputField
        id='email'
        label='Correo electrónico'
        type='email'
        name='email'
        value={form.email}
        onChange={handleChange}
        autoComplete='email'
        className='w-full mt-6'
      />

      <PhoneInput />

      <InputField
        id='message'
        label='Mensaje'
        type='textarea'
        name='message'
        value={form.message}
        onChange={handleChange}
        rows={4}
        className='w-full mt-6'
      />

      <SwitchField agreed={agreed} setAgreed={setAgreed} />

      <button
        type='submit'
        disabled={loading}
        className='mt-6 px-6 py-3 bg-gray-900 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105 w-full disabled:opacity-50'
      >
        {loading ? 'Sending...' : 'Enviar mensaje'}
      </button>
    </form>
  );
};

export default ContactForm;
