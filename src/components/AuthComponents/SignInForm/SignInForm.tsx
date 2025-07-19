import React, { useState } from 'react';
import InputField from '../../shared/inputs/InputField';
import useSignIn from '../../../hooks/auth/useSignIn';
import SubmitButton from '../../shared/SubmitButton';

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useSignIn({ username, password });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(e);
  };

  return (
    <div className='w-full max-w-sm mx-auto pb-10'>
      <form
        onSubmit={handleSubmit}
        className='space-y-6 text-gray-800 text-start'
      >
        <InputField
          label='Username'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='juangonzalez'
        />
        <InputField
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Your password'
        />
        <SubmitButton text='Sign in' />
      </form>
    </div>
  );
};

export default SignInForm;
