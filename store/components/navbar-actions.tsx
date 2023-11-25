"use client";

import Button from "@/components/ui/button1";
import useCart from "@/hooks/use-cart";
import { Package, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SignOut from "./signOut";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "./ui/theme-toggle";

const NavbarActions = () => {

	const [isMounted,setIsMounted] = useState(false);
	useEffect(()=>{
		setIsMounted(true);
	},[]);
	const session = useSession();
	const router = useRouter();
	const cart = useCart();

	if(!isMounted){
		return null;
	}
	if(!session.data){
		return null
	}
	
  	return (
		<div className="ml-auto flex items-center gap-x-4">
			<Button className="flex items-center rounded-full bg-black px-4 py-2" onClick={()=>router.push('/cart')}>
				<ShoppingBag
					size={20}
					color="white"
				/>
				<span className="font-medium ml-2 text-sm text-white">
				{cart.items.length}
				</span>
			</Button>
			<Button className="flex items-center px-4 py-2 rounded-full" onClick={()=>router.push('/orders')}>
				<Package
					size={20}
					color="white"
				/>
				<span className="font-medium ml-2 text-sm text-white">Orders</span>
			</Button>
			<SignOut/>
			<ThemeToggle/>
			
		</div>
  )
}

export default NavbarActions