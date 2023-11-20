'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const FormSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z
	  .string()
	  .min(1, 'Password is required')
	  .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
	  resolver: zodResolver(FormSchema),
	  defaultValues: {
		email: '',
		password: '',
	  },
	});
  
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
	  
  
	  const signInData = await signIn('credentials',{
		email:values.email,
		password:values.password,
		redirect:false
	  });
  
	  if(signInData?.error){
		toast.error("Somethin went wrong!!");
	  }else{
  
		router.refresh();
		router.push('http://localhost:8080/');
	  }
	
	
	};
  
	return (
		<Card>
			<CardHeader>
        		<CardTitle>Login</CardTitle>
      		</CardHeader>
			<CardContent>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='space-y-2'>
					<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input placeholder='mail@example.com' {...field} />
						</FormControl>
						<FormMessage />
						</FormItem>
					)}
					/>
					<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
						<FormLabel>Password</FormLabel>
						<FormControl>
							<Input
							type='password'
							placeholder='Enter your password'
							{...field}
							/>
						</FormControl>
						<FormMessage />
						</FormItem>
					)}
					/>
				</div>
				<Button className='w-full mt-6' type='submit'>
					Sign in
				</Button>
				</form>
				<div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
					or
				</div>
		</Form>
		<CardFooter>
			<p className='text-center text-md text-gray-800'>
				If you don&apos;t have an account, please&nbsp;
				<Link href='/sign-up'>
					<Button variant="secondary" className='hover:bg-slate-900 hover:text-white h-10'>Sign up</Button>
				</Link>
			</p>
		</CardFooter>
	  </CardContent>
	  </Card>
	);
  };
  
  export default SignInForm;
  

