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

module.exports = {
    query: (text: string, params: any, callback: any) => {
        return pool.query(text, params, callback);
    }
};