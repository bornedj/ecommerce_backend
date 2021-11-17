//imports
const { Pool } = require('pg')

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
    const rowCount = await pool.query(`SELECT COUNT(*) FROM users WHERE email = ${userEmail}`)
    return rowCount > 0;

};

module.exports = {
    query,
    doesUserExist
}