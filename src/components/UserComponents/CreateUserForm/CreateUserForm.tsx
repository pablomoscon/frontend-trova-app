import React, { useState } from 'react';
import { UserCircleIcon } from 'lucide-react';
import InputField from '../../Shared/inputs/InputField';
import { validateForm } from '../../../utils/validateSignUpUtils';
import useSignUp from '../../../hooks/auth/useSignUp';
import { getRoleOptions } from '../../../utils/roleUtils';
import SelectInput from '../../Shared/inputs/SelectInput';
import { SignUpData } from '../../../Interfaces/AuthInterface';

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

  const fields: {
    label: string;
    name: keyof SignUpData;
    placeholder: string;
    type?: string;
  }[] = [
    {
      label: 'Nombre',
      name: 'name',
      placeholder: 'Juan Gonzalez',
    },
    {
      label: 'Apellido',
      name: 'username',
      placeholder: 'juangonzalez',
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'juangonzalez@mail.com',
    },
    {
      label: 'Contraseña',
      name: 'password',
      type: 'password',
      placeholder: 'Tu contraseña',
    },
    {
      label: 'Confirme la contraseña',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Repetí tu contraseña',
    },
  ];

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
            {/* 🔥 Render dinámico de inputs */}
            {fields.map((f) => (
              <InputField
                key={f.name}
                label={f.label}
                name={f.name}
                type={f.type ?? 'text'}
                value={formData[f.name]}
                onChange={handleChange}
                placeholder={f.placeholder}
                error={errors[f.name]}
              />
            ))}

            {/* Select Input */}
            <SelectInput
              label='Rol'
              name='role'
              value={formData.role}
              onChange={handleChange}
              options={roles}
              placeholder='Seleccioná el rol'
              error={errors.role}
            />

            {/* Foto */}
            <div>
              <p className='block text-sm font-medium text-gray-700 text-center'>
                Foto
              </p>
              <div className='mt-2 flex flex-col items-center gap-y-3'>
                <UserCircleIcon className='size-12 text-gray-300' />
                <button
                  type='button'
                  className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                  Cambiar
                </button>
              </div>
            </div>
          </div>

          {/* Botón Enviar */}
          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-90 flex justify-center py-2 px-4 border border-transparent rounded-md bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600'
            >
              Enviar
            </button>
          </div>

          {/* Link Sign In */}
          <p className='mt-4 text-center text-sm text-gray-600'>
            ¿Ya tenés una cuenta?{' '}
            <a
              href='/sign-in'
              className='font-medium text-gray-600 hover:text-gray-500'
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
