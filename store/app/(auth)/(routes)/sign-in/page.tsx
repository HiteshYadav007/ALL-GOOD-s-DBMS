import Welcome from '@/components/welcome';
import SignInForm from '@/components/form/SignInForm';

const page = () => {
  return (
    <div>
      <Welcome />
      <div className='mb-2'/>
      <SignInForm />
    </div>
  );
};

export default page;