import React from 'react';

const Spinner: React.FC = () => (
  <div className='fixed inset-0 flex justify-center items-center bg-[#E5E6E4] z-50'>
    <div className='w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin'></div>
  </div>
);
export default Spinner;
