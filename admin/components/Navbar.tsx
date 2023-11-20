import { redirect } from "next/navigation";

import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getCategory } from "@/db/controllers/apiController";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "./ui/button";
import SignOut from "./SignOut";

const Navbar = async() => {
	const session = await getServerSession(authOptions);
	const userId = session?.user.id;
	
	if(!userId){
		redirect('/sign-in');
	}
	const rows = await getCategory();
		
	return (
		<div className="border-b ">
			<div className="flex h-16 items-center px-4">
				<StoreSwitcher items={rows}/>
				<MainNav className="mx-6"/>
				<div className="ml-auto flex items-center space-x-4">
					<SignOut/>
					<ThemeToggle/>

				</div>
			</div>
		</div>
	)
}

export default Navbar