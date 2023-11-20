'use client';
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const SignOut = () => {
	return ( 
		<Button variant='destructive'  onClick={() => signOut({
			redirect:true,
			callbackUrl:`${window.location.origin}/sign-in`
		})} >
		Sign out
	   </Button>
	 );
}
 
export default SignOut;