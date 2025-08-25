import AuthLayout from '../../components/authComponents/AuthLayout/AuthLayout';
import SignInForm from '../../components/authComponents/SignInForm/SignInForm';

const SignInView = () => (
  <AuthLayout>
    <div className='text-center'>
      <h2 className='mt-6 text-2xl font-bold text-gray-900'>
        Ingresá a tu cuenta
      </h2>
    </div>
    <SignInForm />
  </AuthLayout>
);

export default SignInView;
