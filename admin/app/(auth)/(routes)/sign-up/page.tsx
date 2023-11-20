import Welcome from '@/components/Welcome';
import SignUpForm from '@/components/forms/SignUpForm';

const page = () => {
  return (
    <div >
      <Welcome/>
      <div className='mb-2'/>
      <SignUpForm />
    </div>
  );
};

export default page;
