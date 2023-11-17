import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket } from 'mysql2';

import pool from '../database';

interface Billboard extends RowDataPacket {
	billboardId:string
	label: string
	imageUrl:string
    categoryId:string
	createdAt:Date
	updatedAt:Date
}

export const insertBillboard = async (
	label:string,
	imageUrl:string,
	categoryId:string
) => {
	const id = uuidv4();
	const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); 
	const queryString = `INSERT INTO store.billboard (billboardId,label,imageUrl,categoryId,createdAt,updatedAt) VALUES (?,?,?,?,?,?);`
	await pool.execute(queryString,[id,label,imageUrl,categoryId,createdAt,updatedAt]);
	return id;
}

export const getAllBillboards = async (categoryId:string) => {
	const queryString = 'SELECT * FROM store.billboard WHERE categoryId = ? order by createdAt DESC;'
	const [rows] = await pool.query<Billboard[]>(queryString,categoryId);
	const parsedrows:Billboard[] = []
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows;
}

export const getBillboard = async (billboardId:string) => {
	const queryString = "SELECT * FROM store.billboard WHERE billboardId=?";
	const [rows] = await pool.query<Billboard[]>(queryString, billboardId);
	const parsedrows:Billboard[] = []
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows[0];
}

export const updateBillboard = async(
	label:string,
	imageUrl:string,
	billboardId:string
) => {
  const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const queryString = 'UPDATE store.billboard SET label = ? , imageUrl = ? , updatedAt = ? WHERE billboardId = ?';
  const [updated] = await pool.execute(queryString,[label,imageUrl,updatedAt,billboardId]);
  return billboardId;
};

export const deleteBillboard = async (billboardId:string) => {
	const queryString = `DELETE from store.billboard where billboardId = ? ;`
	await pool.execute(queryString,[billboardId])
	return billboardId;
}