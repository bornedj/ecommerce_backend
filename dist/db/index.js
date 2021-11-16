const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "ecommerce",
    port: 5432
});
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
};
//# sourceMappingURL=index.js.map