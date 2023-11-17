import { format } from 'date-fns';

import  CategoryClient  from './components/client';
import prismadb from '@/lib/prismadb';
import { CategoryColumn } from './components/columns';
import { Suspense } from 'react';
import Loading from '@/components/ui/loading';
import { getAllCategories } from '@/db/controllers/categoryApiController';


const CategoriesPage = async (
	{ params }: { params:{ storeId : string }}) => {

	const categories = await getAllCategories(params.storeId);
	// console.log(categories);
	const formattedCategories:CategoryColumn[] = categories.map((item) => ({
		id:item.subCategoryId,
		name:item.name,
		billboardLabel:item.label,
		createdAt:format(item.createdAt,"MMMM do, yyyy")
	}))
  return (
	<Suspense fallback={<Loading/>}>
	<div className='flex-col'>
		<div className='flex-1 space-y-4 p-8 pt-6'>
			<CategoryClient data = {formattedCategories}/>
		</div>
	</div>
	</Suspense>
  )
}

export default CategoriesPage;