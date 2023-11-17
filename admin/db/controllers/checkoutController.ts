import { RowDataPacket } from 'mysql2';
import pool from '../database';
import { v4 as uuidv4 } from 'uuid';

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

export const getAllProductsByProductIDs = async(
	data:string[]
) => {
	const queryString = 'SELECT * from store.product WHERE productId IN (?);';
	const [rows] = await pool.execute<Product[]>(queryString,data);
	const parsedrows:Product[] = []
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows[0];
}

export const insertOrder = async (
	categoryId:string,
	productId:string,
	price:number
) => {
	const orderId = uuidv4();
	const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); 
	const queryString = 'INSERT INTO store.orders(orderId,productId,categoryId,isPaid,createdAt,updatedAt,price) VALUES (?,?,?,?,?,?,?)';
	const [row] = await pool.execute(queryString,[orderId,productId,categoryId,0,createdAt,updatedAt,price]);
	return orderId;
}

export const updateOrder = async (
	address : string,
	phoneno : string,
	orderId : string
) => {
	const queryString = 'UPDATE store.orders SET address = ?, phoneno = ?, isPaid = ?  WHERE orderId = ?';
	const [updated] = await pool.execute(queryString,[address,phoneno,1,orderId]);
	return orderId;
}

export const getAllOrders = async (
	categoryId:string
) => {
	const queryString = 'SELECT store.orders.orderId ,store.orders.productId, store.product.name  ,store.orders.phoneno , store.orders.address , store.orders.isPaid ,store.orders.createdAt  , store.orders.price  FROM store.orders INNER JOIN store.product ON store.orders.productId = store.product.productId WHERE store.orders.categoryId = ?';
	const [rows] = await pool.execute<Order[]>(queryString,[categoryId]);
	const parsedrows:Order[] = []
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows;
}

