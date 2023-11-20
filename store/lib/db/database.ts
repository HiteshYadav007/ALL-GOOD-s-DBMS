import mysql from 'mysql2';

const pool =  mysql.createConnection({
	host:'localhost',
	user:'root',
	database:'store',
	password:'#Hitesh2003'
});
  
export default pool.promise();