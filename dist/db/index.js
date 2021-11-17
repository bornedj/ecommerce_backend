const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "ecommerce",
    port: 5432
});
const query = async (text, params, callback) => {
    return await pool.query(text, params, callback);
};
const doesUserExist = async (userEmail) => {
    const rowCount = await pool.query(`SELECT COUNT(*) FROM users WHERE email = ${userEmail}`);
    return rowCount > 0;
};
module.exports = {
    query,
    doesUserExist
};
//# sourceMappingURL=index.js.map