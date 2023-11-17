import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import { findFirst } from "@/db/controllers/apiController";

export default async function DashboardLayout({
	children,
	params
} : {
	children:React.ReactNode;
	params:{storeId:string}
}) {
	
	const {userId} = auth();
	
	if(!userId){
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