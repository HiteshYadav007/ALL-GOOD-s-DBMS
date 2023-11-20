import Welcome from '@/components/welcome';
import SignUpForm from '@/components/form/SignUpForm';

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
