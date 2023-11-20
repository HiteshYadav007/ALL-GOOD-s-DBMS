import pool from '@/lib/db/database';

import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket } from 'mysql2';

interface Customer extends RowDataPacket{
	customerId:string
	name:string
	email:string
	password:string
}

export const createUser = async(
	email: string,	
	username: string,
	password: string,
) => {
	const sellerId = uuidv4();
	const queryString = `INSERT INTO store.customer(customerId,name,email,password) VALUES (?,?,?,?)`;
	const [inserted] = await pool.execute(queryString,[sellerId,username,email,password]);
	return sellerId;
}

export const findUserByEmail = async (
	email:string
) => {
	const queryString = `SELECT * from store.customer WHERE email = ? `;
	const [rows] = await pool.execute<Customer[]>(queryString,[email]);
	const parsedrows:Customer[] = [];
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows[0];
}