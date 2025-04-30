import { UserCircleIcon } from 'lucide-react';
import InputField from '../InputField/InputField';
import { useState } from 'react';
import { validateForm } from '../../../utils/validateSignUp';
import useSignUp from '../../../hooks/auth/useSignUp';

const SignUpForm = () => {
  const { formData, handleChange, handleSubmit } = useSignUp();
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmitWithValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData, setErrors)) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmitWithValidation} className='space-y-6'>
      <div className='grid grid-cols-1 gap-y-6 text-start text-gray-700'>
        <InputField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Juan Gonzalez'
          error={errors.name}
        />

        <InputField
          label='Username'
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
          label='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Your password'
          error={errors.password}
          type='password'
        />

        <InputField
          label='Confirm password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder='Repeat your password'
          error={errors.confirmPassword}
          type='password'
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

      <button
        type='submit'
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
      >
        Sign up
      </button>

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
  );
};

export default SignUpForm;
