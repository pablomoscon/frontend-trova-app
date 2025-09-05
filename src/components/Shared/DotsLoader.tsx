import React from 'react';

const DotsLoader: React.FC = () => (
  <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50'>
    <div className='flex space-x-2'>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
    </div>
  </div>
);

export default DotsLoader;
