//imports
// const { Pool } = require('pg')
import { Pool } from 'pg';


//setting up the connection with postgres
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "ecommerce",
    port: 5432
});

const query = async (text: string, params: any, callback: any) => {
    return await pool.query(text, params, callback);
}

//function to check if user exists
const doesUserExist = async (userEmail: string) => {
    const query = await pool.query(`SELECT * FROM users WHERE email = '${userEmail}';`)
    return query.rowCount > 0;
};

const insertUser = async (firstName: string, lastName: string, email: string, password: string) => {
    return await pool.query(`INSERT INTO users (firstName, lastName, email, password) 
    VALUES ('${firstName}', '${lastName}', '${email}', '${password}');`);
}

const loginUser = async (email: string, password: string): Promise<boolean> => {
    const select = await pool.query(
        `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
        )
 
    return select.rowCount > 0;
}

// const loginUser = async (username: string, )
const db = {
    query,
    doesUserExist,
    insertUser,
    loginUser
}

export default db;