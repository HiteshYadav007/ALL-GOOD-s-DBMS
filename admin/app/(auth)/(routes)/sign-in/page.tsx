import Welcome from '@/components/Welcome';
import SignInForm from '@/components/forms/SignInForm';

const page = () => {
  return (
    <div>
      <Welcome/>
      <div className='mb-2'/>
      <SignInForm />
    </div>
  );
};

export default page;
