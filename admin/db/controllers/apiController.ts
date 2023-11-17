import { RowDataPacket } from 'mysql2';
import pool from '../database';
import { v4 as uuidv4 } from 'uuid';

interface Store extends RowDataPacket {
	id:string
	name: string
    userId:string
	createdAt:Date
	updatedAt:Date
}

export const getCategory = async() => {
	const queryString = 'SELECT * FROM store.category;';
	const [rows] = await pool.query<Store[]>(queryString);
	const parsedrows:Store[] = []
	rows.forEach((row) => parsedrows.push(row));
	return parsedrows;
};

export const insertCategory = async ({data}:{data:{name:string , userId:string}}) => {
	const id = uuidv4();
	const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const userId = data.userId;
	const name = data.name;
	const queryString = 'INSERT INTO store.category (id,name,userId,createdAt, updatedAt) VALUES(?,?,?,?,?); ';
	const [inserted] = await pool.execute(queryString,[id,name,userId,updatedAt,createdAt]);
	return id;
};

export const updateCategory = async(
	name:string,
	storeId:string
) => {
  const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const queryString = 'UPDATE store.category SET name = ? , updatedAt = ? WHERE id = ?';
  const [updated] = await pool.execute(queryString,[name,updatedAt,storeId]);
  return storeId;
};

export const findFirst = async(
	storeId:string
	)=>{
	const queryString = `SELECT * FROM store.category where id = ?;`;
	const [rows] = await pool.query<Store[]>(queryString,[storeId]);
	const parsedRows:any = [];
	rows.forEach((row) => parsedRows.push(row));
	return parsedRows[0];
};

export const loadStore = async() => {
	const queryString = `SELECT * FROM store.category;`
	const [rows] = await pool.query<Store[]>(queryString);
	const parsedRows:any = [];
	rows.forEach((row) => parsedRows.push(row));
	return parsedRows[0];
}

export const authorizedStore = async (
	storeId:string,
	userId:string
) => {
	const queryString = `SELECT * FROM store.category where (id = ? and userId=?);`
	const [rows] = await pool.query<Store[]>(queryString,[storeId,userId])
	const parsedRows:any = [];
	rows.forEach((row) => parsedRows.push(row));
	return parsedRows[0];
}



export const deleteStore = async (storeId:string) => {
	const queryString = `DELETE from store.category where id = ? ;`
	await pool.execute(queryString,[storeId])
	return storeId;
}





