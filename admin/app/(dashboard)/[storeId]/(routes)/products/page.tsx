import { format } from 'date-fns';

import { formatter } from '@/lib/utils';
import ProductClient from './components/client';
import { ProductColumn } from './components/columns';
import {  getProductsByCategory } from '@/db/controllers/productApiController';
import { getAllCategories } from '@/db/controllers/categoryApiController';
import { getAllSizes } from '@/db/controllers/sizeApiController';


const ProductsPage = async (
	{ params }: { params:{ storeId : string }}) => {

	const products = await getProductsByCategory(params.storeId);
	const categories = await getAllCategories(params.storeId);
	const sizes = await getAllSizes(params.storeId);

	const formattedProducts:ProductColumn[] = products.map((item) => ({
		id:item.productId,
		name:item.name,
		isFeatured:(item.isFeatured === 1),
		price:formatter.format(item.price),
		quantity:item.quantity,
		category:categories.find((cat)=> cat.subCategoryId === item.subCategoryId)?.name || '',
		size: sizes.find((size) => size.sizeId === item.sizeId)?.name || "" ,
		createdAt:format(item.createdAt,"MMMM do, yyyy")
	}));


  return (
	<div className='flex-col'>
		<div className='flex-1 space-y-4 p-8 pt-6'>
			<ProductClient data = {formattedProducts}/>
		</div>
	</div>
  )
}

export default ProductsPage;