"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
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
    const query = await pool.query(`SELECT * FROM users WHERE email = '${userEmail}';`);
    return query.rowCount > 0;
};
const insertUser = async (firstName, lastName, email, password) => {
    return await pool.query(`INSERT INTO users (firstName, lastName, email, password) 
    VALUES ('${firstName}', '${lastName}', '${email}', '${password}');`);
};
const loginUser = async (email, password) => {
    const select = await pool.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`);
    return select.rowCount > 0;
};
const getAllProducts = async () => {
    const select = await pool.query("SELECT * FROM products;");
    return select.rows;
};
const getProductByID = async (productID) => {
    const select = await pool.query(`SELECT * FROM products WHERE id = ${productID}`);
    return select.rows[0];
};
const insertProduct = async (name, price, description) => {
    return await pool.query(`INSERT INTO products(name, price, description, created, modified) VALUES 
    ('${name}', ${price}, '${description}', to_timestamp(${Date.now()}), to_timestamp(${Date.now()}));`);
};
const updateProduct = async (id, name, price, description) => {
    await pool.query(`UPDATE products
        SET name = '${name}', price = ${price}, description = '${description}', modified = to_timestamp(${Date.now()})
        WHERE id = ${id};`);
};
const db = {
    query,
    doesUserExist,
    insertUser,
    loginUser,
    getProductByID,
    getAllProducts,
    insertProduct,
    updateProduct
};
exports.default = db;
//# sourceMappingURL=db.js.map