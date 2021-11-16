//imports
const { Pool } = require('pg')

//setting up the connection with postgres
const pgSetup: any = async () => {
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        password: "postgres",
        database: "ecommerce",
        port: 5432
    });

    const res = await pool.query('SELECT NOW()');
    await pool.end();
    console.log(res);
}

pgSetup();

console.log('Hello world');