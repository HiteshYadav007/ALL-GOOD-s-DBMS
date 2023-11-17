"use client";
import { Tab } from "@headlessui/react";
import Image from "next/image";

import GalleryTab from "@/components/gallery/gallery-tab";

interface GalleryProps {
	imageUrl:string
}
const Gallery:React.FC<GalleryProps> = ({
	imageUrl
}) => {

	return ( 
		<Tab.Group as='div' className='flex flex-col-reverse'>
			<div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
				<Tab.List className='grid grid-cols-4 gap-6'>
						<GalleryTab imageUrl={imageUrl}/>
				</Tab.List>
			</div>
			<Tab.Panels className="aspect-sqaure w-full ">
				
						<Tab.Panel >
							<div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
								<Image
									fill
									src={imageUrl}
									alt="Image"
									className="object-cover object-center"
								/>
							</div>
						</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	 );
}
 
export default Gallery;