import React from 'react';

const ContactInfo: React.FC = () => (
  <div className='w-full h-full p-6 bg-gray-100 rounded-lg shadow-md text-start'>
    <h3 className='text-3xl font-semibold text-gray-800 sm:text-4xl'>
      Nuestros datos de contacto
    </h3>
    <div className='mt-6 space-y-4'>
      <div>
        <h4 className='font-semibold text-gray-700'>Correo electrónico</h4>
        <p className='text-gray-600'>contacto@empresa.com</p>
      </div>
      <div>
        <h4 className='font-semibold text-gray-700'>Teléfono</h4>
        <p className='text-gray-600'>(123) 456-7890</p>
      </div>
      <div>
        <h4 className='font-semibold text-gray-700'>Horario de oficina</h4>
        <p className='text-gray-600'>Lun - Vie, 9 AM - 6 PM</p>
      </div>
    </div>
  </div>
);

export default ContactInfo;
