// ContactView.tsx
import React from 'react';
import ContactForm from '../../components/ContactComponents/ContactForm/ContactForm';
import ContactInfo from '../../components/ContactComponents/ContactInfo/ContactInfo';

const ContactView: React.FC = () => (
  <div className='bg-[#E5E6E4] py-32 sm:py-16 lg:px-4 flex justify-center'>
    <div className='mx-auto w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 py-20'>
      {/* Left side: ContactInfo */}
      <div className='w-full border-e border-gray-300 shadow p-6'>
        <ContactInfo />
      </div>

      {/* Right side: ContactForm */}
      <div className='w-full p-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900'>
            Escribe un mensaje
          </h2>
        </div>
        <ContactForm />
      </div>
    </div>
  </div>
);

export default ContactView;
