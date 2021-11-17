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
const getAllUsers = async () => {
    const select = await pool.query("SELECT * FROM users;");
    return select.rows;
};
const selectUserByID = async (userID) => {
    const query = await pool.query(`SELECT *
        FROM users
        WHERE id = ${userID};`);
    return query.rows[0];
};
const doesUserExist = async (userEmail) => {
    const query = await pool.query(`SELECT * FROM users WHERE email = '${userEmail}';`);
    return query.rowCount > 0;
};
const insertUser = async (firstName, lastName, email, password) => {
    return await pool.query(`INSERT INTO users (firstName, lastName, email, password) 
    VALUES ('${firstName}', '${lastName}', '${email}', '${password}');`);
};
const updateUser = async (id, firstName, lastName, password, email) => {
    return await pool.query(`UPDATE users
        SET firstName = '${firstName}', lastName = '${lastName}', password = '${password}', email = '${email}'
        WHERE id = ${id};`);
};
const deleteUser = async (id) => {
    await pool.query(`DELETE FROM users WHERE id = ${id}`);
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
    return await pool.query(`UPDATE products
        SET name = '${name}', price = ${price}, description = '${description}', modified = to_timestamp(${Date.now()})
        WHERE id = ${id};`);
};
const deleteProduct = async (id) => {
    await pool.query(`DELETE FROM products WHERE id = ${id}`);
};
const insertCart = async () => {
    await pool.query(`INSERT INTO cart (created, modified)
        VALUES (to_timestamp(${Date.now()}), to_timestamp(${Date.now()}));`);
};
const getAllCarts = async () => {
    const query = await pool.query("SELECT * FROM cart");
    return query.rows;
};
const getCartByID = async (cartID) => {
    const query = await pool.query(`SELECT * FROM cart
        WHERE id = ${cartID};`);
    return query.rows[0];
};
const db = {
    query,
    doesUserExist,
    insertUser,
    loginUser,
    getProductByID,
    getAllProducts,
    insertProduct,
    updateProduct,
    deleteProduct,
    getAllUsers,
    selectUserByID,
    updateUser,
    deleteUser,
    getAllCarts,
    getCartByID,
    insertCart
};
exports.default = db;
//# sourceMappingURL=db.js.map