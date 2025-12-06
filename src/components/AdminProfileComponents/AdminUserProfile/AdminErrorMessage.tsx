import React from 'react';
import { AdminErrorMessageProps } from '../../../Interfaces/AdminProfileInterface';

const AdminErrorMessage: React.FC<AdminErrorMessageProps> = ({ message }) => (
  <div className='text-center py-10 text-red-500'>{message}</div>
);

export default AdminErrorMessage;
