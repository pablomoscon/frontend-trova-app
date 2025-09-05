import React, { useState } from 'react';
import InputField from '../../Shared/inputs/InputField';
import useSignIn from '../../../hooks/auth/useSignIn';
import SubmitButton from '../../Shared/SubmitButton';
import DotsLoader from '../../Shared/DotsLoader';

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { handleSubmit, loading } = useSignIn({ username, password });

  return (
    <div className='w-full max-w-sm mx-auto pb-10 relative'>
      
      {loading && (
          <DotsLoader />
      )}

      <form
        onSubmit={handleSubmit}
        className='space-y-6 text-gray-800 text-start'
      >
        <InputField
          label='Nombre de usuario'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='juangonzalez'
        />
        <InputField
          label='Contraseña'
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Tu contraseña'
        />

        <SubmitButton text='Ingresá' />
      </form>
    </div>
  );
};

export default SignInForm;
