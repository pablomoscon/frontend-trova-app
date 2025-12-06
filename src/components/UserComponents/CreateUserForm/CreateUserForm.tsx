import React, { useState } from 'react';
import { UserCircleIcon } from 'lucide-react';
import InputField from '../../Shared/inputs/InputField';
import SelectInput from '../../Shared/inputs/SelectInput';
import { SignUpData } from '../../../Interfaces/AuthInterface';
import useSignUp from '../../../hooks/auth/useSignUp';
import { getRoleOptions } from '../../../utils/roleUtils';
import { validateForm } from '../../../utils/validateSignUpUtils';
import AuthLayout from '../../AuthComponents/AuthLayout/AuthLayout';
import Button from '../../Shared/Button';

const CreateUserForm: React.FC = () => {
  const { formData, handleChange, handleSubmit } = useSignUp();
  const [errors, setErrors] = useState<Record<keyof SignUpData, string>>({
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
    { label: 'Nombre', name: 'name', placeholder: 'Juan Gonzalez' },
    { label: 'Apellido', name: 'username', placeholder: 'juangonzalez' },
    { label: 'Email', name: 'email', placeholder: 'juangonzalez@mail.com' },
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
    <AuthLayout title='Crea una cuenta de usuario'>
      <form onSubmit={handleSubmitWithValidation} className='space-y-6'>
        <div className='grid grid-cols-1 gap-y-6 text-start text-gray-700'>
          {/* 🔥 Inputs dinámicos */}
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

          {/* Select Input de roles */}
          <SelectInput
            label='Rol'
            name='role'
            value={formData.role}
            onChange={handleChange}
            options={roles}
            placeholder='Seleccioná el rol'
            error={errors.role}
          />

          {/* Avatar */}
          <div className='flex flex-col items-center gap-y-3'>
            <p className='block text-sm font-medium text-gray-700 text-center'>
              Foto
            </p>
            <UserCircleIcon className='size-12 text-gray-300' />
            <button
              type='button'
              className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            >
              Cambiar
            </button>
          </div>
        </div>

        {/* Botón submit */}
        <Button text='Enviar' />

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
    </AuthLayout>
  );
};

export default CreateUserForm;
