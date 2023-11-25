import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket } from 'mysql2';

import pool from '../database';

interface Product extends RowDataPacket {
	productId:string
	name:string
	price:number
	categoryId:string 
	subcategoryId:string 
	sizeId:string
	quantity:Number
	isFeatured:Number
	imageUrl:string
	createdAt:Date
	updatedAt:Date
}

export const insertProduct = async (
	name:string,
	price:string,
	categoryId:string,
	subCategoryId:string,
	sizeId:string,
	quantity:number,
	isFeatured:boolean,
	imageUrl:string,
) => {
	const productId = uuidv4();
	const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); 
	const queryString = `INSERT INTO store.product(productId,name,price,subCategoryId,sizeId,quantity,isFeatured,imageUrl,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?);`
	await pool.execute(queryString,[productId,name,price,subCategoryId,sizeId,quantity,isFeatured,imageUrl,createdAt,updatedAt]);
	return productId;
}

export const getProducts =async (
	subCategoryId:string | undefined,
	sizeId:string | undefined,
	isFeatured:string | undefined,
	categoryId:string
) => {
	let queryString = '';
	let parsedrows:Product[] = [];
	if(subCategoryId !== undefined && sizeId !== undefined && isFeatured !== undefined){
		queryString = 'Select store.product.productId , store.product.name , store.product.price  , store.product.quantity , store.product.isFeatured , store.product.imageUrl ,store.product.subCategoryId ,store.subCategory.name as subCategoryName , store.size.name as sizeName from store.product INNER JOIN store.subcategory ON store.product.subCategoryId = store.subcategory.subcategoryId INNER JOIN store.size on store.product.sizeId = store.size.sizeId where isFeatured = 1 AND store.product.subCategoryId = ? AND store.product.sizeId = ?';
		let [rows] = await pool.execute<Product[]>(queryString,[subCategoryId,sizeId]);
		rows.forEach((row) => parsedrows.push(row));

	}
	else if(subCategoryId !== undefined && sizeId !== undefined){
		queryString = 'Select store.product.productId , store.product.name , store.product.price  , store.product.quantity , store.product.isFeatured , store.product.imageUrl ,store.product.subCategoryId,store.subCategory.name as subCategoryName , store.size.name as sizeName from store.product INNER JOIN store.subcategory ON store.product.subCategoryId = store.subcategory.subCategoryId INNER JOIN store.size on store.product.sizeId = store.size.sizeId where store.product.subCategoryId = ? AND store.product.sizeId = ?';
		let [rows] = await pool.execute<Product[]>(queryString,[subCategoryId,sizeId]);
		rows.forEach((row) => parsedrows.push(row));
	}
	else if(subCategoryId !== undefined){
		queryString = 'Select store.product.productId , store.product.name , store.product.price  , store.product.quantity , store.product.isFeatured , store.product.imageUrl ,store.product.subCategoryId,store.subCategory.name as subCategoryName ,store.size.name as sizeName from store.product INNER JOIN   store.subcategory ON store.product.subCategoryId = store.subcategory.subCategoryId INNER JOIN store.size on store.product.sizeId = store.size.sizeId  where store.product.subCategoryId = ?';
		let [rows] = await pool.execute<Product[]>(queryString,[subCategoryId]);
		rows.forEach((row) => parsedrows.push(row));
	}
	else if(sizeId !== undefined){
		queryString = 'Select store.product.productId , store.product.name , store.product.price  , store.product.quantity , store.product.isFeatured , store.product.imageUrl ,store.product.subCategoryId, store.size.name as sizeName from store.product INNER JOIN store.size on store.product.sizeId = store.size.sizeId  where store.product.sizeId = ?';
		let [rows] = await pool.execute<Product[]>(queryString,[,sizeId]);
		rows.forEach((row) => parsedrows.push(row));
	}
	else {
		queryString = 'Select store.product.productId , store.product.name , store.product.price  , store.product.quantity , store.product.isFeatured , store.product.imageUrl ,store.product.subCategoryId,store.subCategory.name as subCategoryName , store.size.name as sizeName from store.product INNER JOIN store.subcategory ON store.product.subCategoryId = store.subcategory.subCategoryId INNER JOIN store.size on store.product.sizeId = store.size.sizeId where store.subcategory.categoryId = ? and store.product.isFeatured = 1 ;'
		let [rows] = await pool.execute<Product[]>(queryString,[categoryId]);
		rows.forEach((row) => parsedrows.push(row));
	}
	
	return parsedrows;
}

export const getProduct = async(
	productId:string
) => {
	const queryString = 'Select store.product.productId , store.product.name , store.product.price  , store.product.quantity , store.product.isFeatured , store.product.imageUrl ,store.product.subCategoryId,store.subCategory.name as subCategoryName , store.size.name as sizeName from store.product INNER JOIN store.subcategory ON store.product.subCategoryId = store.subcategory.subCategoryId INNER JOIN store.size on store.product.sizeId = store.size.sizeId where store.product.productId = ? ;'
	const [rows] = await pool.execute<Product[]>(queryString,[productId]);
	const parsedrows:Product[] = [];
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows[0];
}

export const updateProduct = async (
	productId:string,
	name:string,
	price:number,
	subCategoryId:string,
	sizeId:string,
	quantity:number,
	isFeatured:boolean,
	imageUrl:string,
) => {

	const queryString = 'UPDATE store.product SET name = ? , price = ? , subCategoryId = ? , sizeId = ? , quantity = ? , isFeatured = ? , imageUrl = ? , updatedAt = ? where productId = ?;';
	const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const [updated] = await pool.execute(queryString,[name,price,subCategoryId,sizeId,quantity,isFeatured,imageUrl,updatedAt,productId]);
	return productId;
}

export const deleteProduct = async (
	productId:string
)  => {
	const queryString = 'DELETE from store.product where productId = ?';
	const [deleted] = await pool.execute(queryString,[productId]);
	return productId;
}

export const getProductsByCategory = async (
	categoryId:string
) => {
	const queryString = 'Select store.product.productId , store.product.name ,store.product.isFeatured ,store.product.price , store.product.quantity , store.product.subCategoryId,store.product.sizeId , store.product.createdAt from store.product INNER JOIN store.subcategory ON store.product.subCategoryId = store.subcategory.subCategoryId WHERE store.subcategory.categoryId = ?';
	const [rows] = await pool.execute<Product[]>(queryString,[categoryId]);
	const parsedrows:Product[] = [];
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows;
}