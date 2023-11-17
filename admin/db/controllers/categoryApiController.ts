import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket } from 'mysql2';

import pool from '../database';

interface subCategory extends RowDataPacket {
	subCategoryId:string
	name:string
	categoryId:string
	billboardId:string
	createdAt:Date
	updatedAt:Date
}

export const insertCategory = async (
	name:string,
	categoryId:string,
	billboardId:string
) => {
	const id = uuidv4();
	const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); 
	const queryString = `INSERT INTO store.subcategory (subcategoryId,name,categoryId,billboardId,createdAt,updatedAt) VALUES (?,?,?,?,?,?);`
	await pool.execute(queryString,[id,name,,categoryId,billboardId,createdAt,updatedAt]);
	return id;
}

export const getAllCategories = async (
	categoryId:string
) => {
	const queryString = 'SELECT store.subcategory.subCategoryId,store.subcategory.name , store.billboard.label,store.subcategory.createdAt ,store.billboard.billboardId from store.subcategory INNER JOIN store.billboard ON store.subcategory.billboardId = store.billboard.billboardId where store.subcategory.categoryId = ? ORDER BY createdAt DESC ;'
	const [rows] = await pool.execute<subCategory[]>(queryString,[categoryId]);
	const parsedrows:subCategory[] = [];
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows;
}

export const getCategory = async (
	id:string
) => {
	const queryString = "SELECT store.subcategory.subcategoryId,store.subcategory.name , store.billboard.label,store.subcategory.createdAt ,store.billboard.billboardId from store.subcategory INNER JOIN store.billboard ON store.subcategory.billboardId = store.billboard.billboardId where store.subcategory.subcategoryId = ? ";
	const [rows] = await pool.execute<subCategory[]>(queryString,[id]);
	const parsedrows:subCategory[] = [];
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows[0];
}

export const updateCategory = async (
	subCategoryId:string,
	name:string,
	billboardId:string
) => {
	const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const queryString = `UPDATE store.subcategory SET name = ?, billboardId= ? , updatedAt=? WHERE subCategoryId = ?`;
	const [rows] = await pool.execute(queryString,[name,billboardId,updatedAt,subCategoryId]);
	return subCategoryId;
}

export const deleteCategory = async (
	subcategoryId:string
) => {
	const queryString = `DELETE FROM store.subcategory WHERE subCategoryId = ?`;
	const [rows] = await pool.execute(queryString,[subcategoryId]);
	return subcategoryId;
}

