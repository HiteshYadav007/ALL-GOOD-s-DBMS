import { format } from 'date-fns';

import BillboardClient from './components/client';
import prismadb from '@/lib/prismadb';
import { BillboardColumn } from './components/columns';
import { Suspense } from 'react';
import Loading from '@/components/ui/loading';
import { getAllBillboards } from '@/db/controllers/billboardApiController';


const Billboard = async (
	{ params }: { params:{ storeId : string }}) => {

	const billboards = await getAllBillboards(params.storeId);
	const formattedBillboards:BillboardColumn[] = billboards.map((item) => ({
		id:item.billboardId,
		label:item.label,
		createdAt:format(item.createdAt,"MMMM do, yyyy")
	}))
  return (
	<Suspense fallback={<Loading/>}>
	<div className='flex-col'>
		<div className='flex-1 space-y-4 p-8 pt-6'>
			<BillboardClient data = {formattedBillboards}/>
		</div>
	</div>
	</Suspense>
  )
}

export default Billboard