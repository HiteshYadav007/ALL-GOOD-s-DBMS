import { format } from 'date-fns';

import SizesClient from './components/client';
import prismadb from '@/lib/prismadb';
import { SizeColumn } from './components/columns';
import { getAllSizes } from '@/db/controllers/sizeApiController';


const SizesPage = async (
	{ params }: { params:{ storeId : string }}) => {

	const sizes = await getAllSizes(params.storeId);

	const formattedSizes:SizeColumn[] = sizes.map((item) => ({
		id:item.sizeId,
		name:item.name,
		value:item.value,
		createdAt:format(item.createdAt,"MMMM do, yyyy")
	}))
  return (
	<div className='flex-col'>
		<div className='flex-1 space-y-4 p-8 pt-6'>
			<SizesClient data = {formattedSizes}/>
		</div>
	</div>
  )
}

export default SizesPage