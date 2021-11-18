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

//select user by id
const selectUserByID = async (userID: number) => {
    const query = await pool.query(
        `SELECT *
        FROM users
        WHERE id = ${userID};`
    );
    return query.rows[0];//only one result should return
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

//update user information
const updateUser = async (id: number, firstName: string, lastName: string, password: string, email: string) => {
    return await pool.query(
        `UPDATE users
        SET firstName = '${firstName}', lastName = '${lastName}', password = '${password}', email = '${email}'
        WHERE id = ${id};`
    )
}

//delete user
const deleteUser = async (id: number) => {
    await pool.query(
        `DELETE FROM users WHERE id = ${id}`
    );    
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
    await pool.query(
        `DELETE FROM products WHERE id = ${id}`
    );    
}

//------------------------------------------------------------------------------
//cart CRUD
//------------------------------------------------------------------------------

//create cart
const insertCart = async () => {
    await pool.query(
        `INSERT INTO cart (created, modified)
        VALUES (to_timestamp(${Date.now()}), to_timestamp(${Date.now()}));`
    );
}

// get all carts
const getAllCarts = async () => {
    const query = await pool.query(
        "SELECT * FROM cart"
    );
    return query.rows;
}

//get specific cart
const getCartByID = async (cartID: number) => {
    const query = await pool.query(
        `SELECT * FROM cart
        WHERE id = ${cartID};`
    );
    return query.rows[0];//returns cart specified by id
}

// update a cart
const updateCart = async (cartID: number) => {
    return await pool.query(
        `UPDATE cart
        SET modified = (to_timestamp(${Date.now()}))
        WHERE id = ${cartID};`
    );
}

//delete cart
const deleteCart = async (cartID: number) => {
    return await pool.query(
        `DELETE FROM cart WHERE id = ${cartID};`
    );
};

//------------------------------------------------------------------------------
//cart_item CRUD
//------------------------------------------------------------------------------

//create cart item
const insertCartItem = async (productID: number, cartID: number) => {
    return await pool.query(
        `INSERT INTO cart_item (created, modified, product_id, cart_id)
        VALUES (to_timestamp(${Date.now()}), to_timestamp(${Date.now()}), ${productID}, ${cartID});`
    );
}

//get all items in cart
const getAllCartItems = async (cartID: number) => {
    const cartItemQuery = await pool.query(
        `SELECT product_id FROM cart_item
        WHERE cart_id = ${cartID};`
    );
    return cartItemQuery.rows;
};

// get specific cart item
const getCartItemById = async (cartItemID: number) => {
    const query = await pool.query(
        `SELECT * FROM cart_item
        WHERE id = ${cartItemID}`
    );
    return query.rows[0]// returning specific item;
}

// update specific cart item
const updateCartItem = async (cartItemID: number, productID: number, cartID: number) => {
    return await pool.query(
        `UPDATE cart_item
        SET modified = to_timestamp(${Date.now()}), product_id = ${productID}, cart_id = ${cartID}
        WHERE id = ${cartItemID};`
    );
}

// delete cart item
const deleteCartItem = async (cartItemID: number) => {
    return await pool.query(
        `DELETE FROM cart_item WHERE id = ${cartItemID}`
    )
}

//------------------------------------------------------------------------------
//order CRUD
//------------------------------------------------------------------------------

//create order
const insertOrder = async (userID: number, total: number, status: string) => {
    return await pool.query(
        `INSERT INTO orders (userid, total, status, created)
        VALUES (${userID}, ${total}, '${status}', to_timestamp(${Date.now()}));`
    )
}

//select all orders
const getAllOrders = async () => {
    const query = await pool.query(
        'SELECT * FROM orders;'
    );
    return query.rows;
}

// select order where
const getOrderByID = async (orderID: number) => {
    const query = await pool.query(
        `SELECT * FROM orders
        WHERE id = ${orderID};`
    );
    return query.rows[0];
}

// update order where
const updateOrder = async (orderID: number, status: string, total: number) => {
    return await pool.query(
        `UPDATE orders
        SET total = ${total}, status = '${status}', modified = to_timestamp(${Date.now()})
        WHERE id = ${orderID};`
    )
}

// delete order where
const deleteOrder = async (orderID: number) => {
    return await pool.query(
        `DELETE FROM orders WHERE id = ${orderID}`
    )
}

//------------------------------------------------------------------------------
//order item CRUD
//------------------------------------------------------------------------------

//create order
const insertOrderItem = async (quantity: number, price: number, orderID: number, productID: number) => {
    return await pool.query(
        `INSERT INTO order_item (quantity, price, order_id, product_id, created)
        VALUES (${quantity}, ${price}, ${orderID}, ${productID}, to_timestamp(${Date.now()}));`
    )
}

// read order by id
const getOrderItemByID = async (orderItemID: number) => {
    const query = await pool.query(
        `SELECT * FROM order_item
        WHERE id = ${orderItemID}`
    );
    return query.rows[0]// returning specific item;
}

// update order item
const updateOrderItem = async (orderItemID: number, quantity: number, price: number) => {
    return await pool.query(
        `UPDATE order_item
        SET modified = to_timestamp(${Date.now()}), quantity = ${quantity}, price = ${price}
        WHERE id = ${orderItemID};`
    );
}

// delete order item
const deleteOrderItem = async (orderItemID: number) => {
    return await pool.query(
        `DELETE FROM order_item WHERE id = ${orderItemID}`
    )
}

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
    insertCart,
    updateCart,
    deleteCart,
    getAllCartItems,
    insertCartItem,
    getCartItemById,
    updateCartItem,
    deleteCartItem,
    insertOrder,
    getAllOrders,
    getOrderByID,
    updateOrder,
    deleteOrder,
    getOrderItemByID,
    insertOrderItem,
    updateOrderItem,
    deleteOrderItem
}

export default db;