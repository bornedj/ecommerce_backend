"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const cartItem_1 = __importDefault(require("./cartItem"));
const cartRouter = (0, express_1.Router)();
cartRouter.use('/cartItem', cartItem_1.default);
cartRouter.param('cartID', async (req, res, next, id) => {
    const query = await db_1.default.getCartByID(id);
    if (!query) {
        res.status(404).send('Cart not found');
        return;
    }
    req.cart = query;
    next();
});
cartRouter.post('/', async (_, res) => {
    await db_1.default.insertCart();
    res.status(200).send("Cart Created");
});
cartRouter.get('/', async (_, res) => {
    const query = await db_1.default.getAllCarts();
    res.status(200).send(query);
    return;
});
cartRouter.get('/:cartID', async (req, res) => {
    if (req && req.cart && req.cart.id) {
        const cartItems = await db_1.default.getAllCartItems(req.cart.id);
        if (!cartItems) {
            res.status(404).send('No Cart Found');
            return;
        }
        res.status(200).send(cartItems);
        return;
    }
});
cartRouter.put('/:cartID', async (req, res) => {
    if (req && req.cart && req.cart.id) {
        await db_1.default.updateCart(req.cart.id);
        res.status(200).send(req.cart);
        return req.cart;
    }
    return 'something went wrong update';
});
cartRouter.delete('/:cartID', async (req, res) => {
    if (req && req.cart && req.cart.id) {
        await db_1.default.deleteCart(req.cart.id);
        res.status(202).send('Cart deleted');
        return;
    }
    return 'something went wrong';
});
cartRouter.post('/:cartID/checkout', async (req, res) => {
    if (req && req.cart && req.cart.id) {
        const productIDs = await db_1.default.getAllCartItems(req.cart.id);
        const counts = {};
        productIDs.forEach((productID) => {
            const { product_id } = productID;
            counts[product_id] = (counts[product_id] || 0) + 1;
        });
        const productEntries = Object.entries(counts);
        const orderItems = [];
        for (let entry of productEntries) {
            const [key, value] = entry;
            const product = await db_1.default.getProductByID(Number(key));
            product.quantity = value;
            orderItems.push(product);
        }
        let total = 0;
        orderItems.forEach(item => {
            if (item && item.quantity) {
                total = item.quantity * item.price + total;
            }
        });
        const orderIDobj = await db_1.default.insertOrder(req.body.userID, total, 'New Order');
        const { orderID } = orderIDobj;
        for (let item of orderItems) {
            if (item && item.quantity) {
                console.log(item);
                await db_1.default.insertOrderItem(item.quantity, item.price, orderID, item.id);
                res.status(200).send('Checkout Complete');
                return;
            }
        }
        res.status(500).send('unknown error');
    }
});
exports.default = cartRouter;
//# sourceMappingURL=cart.js.map