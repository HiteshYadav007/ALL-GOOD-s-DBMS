import pool from '@/db/database';

import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket } from 'mysql2';

interface Seller extends RowDataPacket{
	sellerId:string
	name:string
	email:string
	password:string
}

export const createUser = async(
	email: string,
	name: string,
	password: string
) => {
	const sellerId = uuidv4();
	const queryString = `INSERT INTO store.seller(sellerId,name,email,password) VALUES (?,?,?,?)`;
	const [inserted] = await pool.execute(queryString,[sellerId,name,email,password]);
	return sellerId;
}

export const findUserByEmail = async (
	email:string
) => {
	const queryString = `SELECT * from store.seller WHERE email = ? `;
	const [rows] = await pool.execute<Seller[]>(queryString,[email]);
	const parsedrows:Seller[] = [];
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows[0];
}


