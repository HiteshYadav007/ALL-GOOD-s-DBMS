 
import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import { findFirst } from "@/db/controllers/apiController";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({
	children,
	params
} : {
	children:React.ReactNode;
	params:{storeId:string}
}) {
	
	const session = await getServerSession(authOptions);
	
	if(!session?.user){
		redirect('/sign-in');
	}
	
	const store = await findFirst(params.storeId);

	if(!store){
		redirect('/');
	}

	return (
		<>
			<Navbar/>
			{children}
		</>
	)
	
}