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

//query builder function
const query = async (text: string, params: any, callback: any) => {
    return await pool.query(text, params, callback);
}

//select all users
const getAllUsers = async () => {
    const select = await pool.query(
        "SELECT * FROM users;"
    );
    return select.rows;
}

//function to check if user exists
const doesUserExist = async (userEmail: string) => {
    const query = await pool.query(`SELECT * FROM users WHERE email = '${userEmail}';`)
    return query.rowCount > 0;
};

//insert user function
const insertUser = async (firstName: string, lastName: string, email: string, password: string) => {
    return await pool.query(`INSERT INTO users (firstName, lastName, email, password) 
    VALUES ('${firstName}', '${lastName}', '${email}', '${password}');`);
}

//user login function returns a boolean value of whether they were logged in or not
const loginUser = async (email: string, password: string): Promise<boolean> => {
    const select = await pool.query(
        `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
        )
 
    return select.rowCount > 0;
}

//select all products
const getAllProducts = async () => {
    const select = await pool.query(
        "SELECT * FROM products;"
    );
    return select.rows;
}

//select product by id
const getProductByID = async (productID: number): Promise<any> => {
    const select = await pool.query(
        `SELECT * FROM products WHERE id = ${productID}`
        )
    return select.rows[0] // return the unique product information
}

//insert product
const insertProduct = async (name: string, price: number, description: string) => {
    return await pool.query(`INSERT INTO products(name, price, description, created, modified) VALUES 
    ('${name}', ${price}, '${description}', to_timestamp(${Date.now()}), to_timestamp(${Date.now()}));`
    );
}

// update product
const updateProduct = async (id: number, name: string, price: number, description: string) => {
    return await pool.query(
        `UPDATE products
        SET name = '${name}', price = ${price}, description = '${description}', modified = to_timestamp(${Date.now()})
        WHERE id = ${id};`
    )
}

//delete product
const deleteProduct = async (id: number) => {
    console.log(id)
    console.log("here")
    await pool.query(
        `DELETE FROM products WHERE id = ${id}`
    );    
}

// const loginUser = async (username: string, )
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
    getAllUsers
}

export default db;