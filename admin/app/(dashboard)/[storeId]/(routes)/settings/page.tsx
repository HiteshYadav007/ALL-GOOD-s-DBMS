 
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import SettingsForm from "./components/SettingsForm";
import { findFirst } from "@/db/controllers/apiController";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface SettingsPageProps {
	params: { storeId: string };
}

const SettingsPage:React.FC<SettingsPageProps> = async({params:{
	storeId,
}}) => {
	
	const session = await getServerSession(authOptions);
	const userId = session?.user.id;
	
	if(!userId){
		redirect('/sign-in');
	}

	const store = await findFirst(storeId);

	if(!store){
		redirect('/');
	}

	return (
	<div  className="flex-col">
		<div className="flex-1 space-y-4 p-8 pt-6">
			<SettingsForm initialData={store}/>
		</div>
	</div>
	);
};

export default SettingsPage;
