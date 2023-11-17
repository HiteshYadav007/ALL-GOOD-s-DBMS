import { loadStore } from "@/db/controllers/apiController";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
	children
} : {
	children:React.ReactNode
}){
	const {userId} = auth();
	
	if(!userId){
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