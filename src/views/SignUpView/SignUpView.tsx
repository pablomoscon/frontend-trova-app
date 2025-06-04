import AuthLayout from '../../components/authComponents/AuthLayout/AuthLayout';
import SignUpForm from '../../components/authComponents/SignUpForm/SignUpForm';

const SignUpView = () => {
  return (
    <AuthLayout>
      <div className='text-center'>
        <h2 className='mt-6 text-2xl font-bold text-gray-900'>
          Create your account
        </h2>
      </div>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpView;
