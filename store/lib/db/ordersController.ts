import pool from '@/lib/db/database';

import { RowDataPacket } from 'mysql2';

interface order extends RowDataPacket {
	productId:string,
	productName:string,
	imageUrl:string,
	price:string,
	createdAt:Date,
	size:string,
	subCategory:string
}

export const getOrders = async(email:string) => {
	const queryString = `CALL GetOrderItemsByUserEmail(?)`;
	const [rows] = await pool.execute<order[]>(queryString,[email]);
	const parsedrows:order[] = []
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows;
}