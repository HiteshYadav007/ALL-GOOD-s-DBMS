'use client';
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import Button from "@/components/ui/button1";
import IconButton from "@/components/ui/icon-button";
import {  Size } from "@/types";
import Filter from "./filter";

interface MobileFilterProps {
	sizes:Size[]
}

const MobileFilters:React.FC<MobileFilterProps> = ({
	sizes,
}) => {
	const [open,setOpen] = useState(false);
	
	const onOpen = () => setOpen(true);
	const onClose = () => setOpen(false);


	
	return ( 
	<>
		<Button onClick={onOpen} className="flex items-center lg:hidden gap-x-2">
			Filters 
			<Plus size={20} />
		</Button> 

		<Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose} >
			{/* Background */}
			<div className="fixed inset-0 bg-black bg-opacity-25 "/>
			{/* Dialog Position  */}
			<div className="fixed inset-0 z-40 flex">
				<Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
					{/* Close Button  */}
					<div className="flex items-center justify-end px-4">
						<IconButton icon={<X size={15}/>} onClick={onClose}/>
					</div>

					{/* Render the filters here */}
					<div className="p-4">
					<Filter
						valueKey="sizeId"
						name="Sizes"
						data={sizes}
					/>
					</div>
				</Dialog.Panel>
			</div>
			
		</Dialog>
	</>
	
	);
}
 
export default MobileFilters;