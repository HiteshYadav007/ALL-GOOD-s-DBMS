import { RowDataPacket } from 'mysql2';
import pool from '../database';
import { v4 as uuidv4 } from 'uuid';

interface Size extends RowDataPacket {
	sizeId:string
	name: string
	value:string
    categoryId:string
	createdAt:Date
	updatedAt:Date
}

export const insertSize = async (
	name:string,
	value:string,
	categoryId:string
) => {
	const sizeId = uuidv4();
	const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); 
	const queryString = `INSERT INTO store.size(sizeId,name,value,categoryId,createdAt,updatedAt) VALUES (?,?,?,?,?,?)`;
	await pool.execute(queryString,[sizeId,name,value,categoryId,createdAt,updatedAt]);
	return sizeId; 
}

export const getAllSizes = async (
	categoryId:string
) => {
	const queryString = `Select * from store.size where categoryId = ? ORDER BY createdAt DESC;`;
	const [rows] = await pool.query<Size[]>(queryString,categoryId);
	const parsedrows:Size[] = []
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows;
}

export const getSize = async (
	sizeId:string
) => {
	const queryString = `SELECT * FROM store.size WHERE sizeId=?`;
	const [rows] = await pool.query<Size[]>(queryString,sizeId);
	const parsedrows:Size[] = []
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows[0];
}

export const updateSize = async (
	name:string,
	value:string,
	sizeId:string
) => {
	const queryString = `UPDATE store.size SET name = ? , value = ? WHERE sizeId = ? ;`
	const [updated] = await pool.execute(queryString,[name,value,sizeId]);
	return sizeId;
}

export const deleteSize = async (
	sizeId:string
) => {
	const queryString = `DELETE FROM store.size WHERE sizeId = ?;`
	const [deleted] = await pool.execute(queryString,[sizeId]);
	return sizeId;
}