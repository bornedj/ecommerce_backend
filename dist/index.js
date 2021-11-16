const { Pool } = require('pg');
const pgSetup = async () => {
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
};
pgSetup();
console.log('Hello world');
//# sourceMappingURL=index.js.map