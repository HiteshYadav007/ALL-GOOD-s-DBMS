import { loadStore } from "@/db/controllers/apiController";
import { authOptions } from "@/lib/auth";
 
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SetupLayout({
	children
} : {
	children:React.ReactNode
}){
	const session = await getServerSession(authOptions);
	
	if(!session?.user){
		redirect('/sign-in');
	}

	const store = await loadStore();

	if(store){
		redirect(`/${store.id}`);
	}

	return (
		<>
			{children}
		</>
	)


}