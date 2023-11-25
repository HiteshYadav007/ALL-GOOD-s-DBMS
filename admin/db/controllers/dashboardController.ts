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
interface Order extends RowDataPacket {
	orderId: string,
	productId:string,
	name:string,
	phoneno:string,
	address:string,
	isPaid:number,
	createdAt:Date,
}

interface Revenue extends RowDataPacket {
	month:number,
	total:number
}
interface salesCount extends RowDataPacket {
	count:number
}
export const getGraphRevnue = async(categoryId:string) => {
	const queryString = `CALL GetMonthlyRevenueByCategory(?);`;
	const [rows] = await pool.execute<Revenue[]>(queryString,[categoryId]);
	const parsedrows:Revenue[] = [];
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows;
}

export const getSalesCnts = async(categoryId:string) => {
	const queryString = `SELECT COUNT(*) as count from store.orders WHERE isPaid = 1 and store.orders.categoryId = ?`;
	const  [rows] = await pool.execute<salesCount[]>(queryString,[categoryId]);
	const parsedRows:any= rows[0];
	return parsedRows;
}

export const getStockCnt =async (categoryId:string) => {
	const queryString = `SELECT SUM(quantity) as count from store.product INNER JOIN  store.subcategory 
	 ON store.product.subCategoryId = store.subcategory.subCategoryId WHERE store.subcategory.categoryId = ?`;
	const  [rows] = await pool.execute<salesCount[]>(queryString,[categoryId]);
	const parsedRows:any= rows[0];
	return parsedRows;
}

export const totalRevnue =async (categoryId:string) => {
	const queryString = `SELECT SUM(price) as revenue from store.orders WHERE isPaid = 1 and categoryId = ?`;
	const  [rows] = await pool.execute<salesCount[]>(queryString,[categoryId]);
	const parsedRows:any= rows[0];
	return parsedRows;
}

