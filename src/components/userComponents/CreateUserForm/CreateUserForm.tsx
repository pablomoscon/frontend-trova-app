import React, { useState } from 'react';
import { UserCircleIcon } from 'lucide-react';
import InputField from '../../shared/inputs/InputField';
import { validateForm } from '../../../utils/validateSignUp';
import useSignUp from '../../../hooks/auth/useSignUp';
import SelectInput from '../../shared/inputs/SelectInputProps';
import { getRoleOptions } from '../../../utils/roleUtils';

const CreateUserForm: React.FC = () => {
  const { formData, handleChange, handleSubmit } = useSignUp();
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const roles = getRoleOptions();

  const handleSubmitWithValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData, setErrors)) {
      handleSubmit(e);
    }
  };

  return (
    <div className='bg-[#E5E6E4] min-h-screen w-full mt-20 py-10 px-4 sm:px-6 lg:px-20'>
      <div className='mx-auto max-w-full px-6 lg:px-8 bg-gray-100 p-8 rounded-lg shadow-md pb-10 my-10'>
        <div className='text-center py-6'>
          <h2 className='my-6 text-2xl font-bold text-gray-900'>
            Crea una cuenta de usuario
          </h2>
        </div>

        <form onSubmit={handleSubmitWithValidation} className='space-y-6'>
          <div className='grid grid-cols-1 gap-y-6 text-start text-gray-700'>
            <InputField
              label='Nombre'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Juan Gonzalez'
              error={errors.name}
            />

            <InputField
              label='Apellido'
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='juangonzalez'
              error={errors.username}
            />

            <InputField
              label='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='juangonzalez@mail.com'
              error={errors.email}
            />

            <InputField
              label='Contraseña'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Your password'
              error={errors.password}
              type='password'
            />

            <InputField
              label='Confirme la contraseña'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Repeat your password'
              error={errors.confirmPassword}
              type='password'
            />

            <SelectInput
              label='Rol'
              name='role'
              value={formData.role}
              onChange={handleChange}
              options={roles}
              placeholder='Seleccioná el rol'
              error={errors.role}
            />

            <div>
              <label className='block text-sm font-medium text-gray-700 text-center'>
                Photo
              </label>
              <div className='mt-2 flex flex-col items-center gap-y-3'>
                <UserCircleIcon className='size-12 text-gray-300' />

                <button
                  type='button'
                  className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-90 flex justify-center py-2 px-4 border border-transparent rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              Enviar
            </button>
          </div>
          <p className='mt-4 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <a
              href='/signin'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
