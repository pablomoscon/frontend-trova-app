import React from 'react';

const Spinner: React.FC = () => (
  <div className='flex justify-center items-center h-full py-10'>
    <div className='w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin'></div>
  </div>
);

export default Spinner;
