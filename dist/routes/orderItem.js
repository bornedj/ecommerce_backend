"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const orderItemRouter = (0, express_1.Router)();
orderItemRouter.param('orderItemID', async (req, res, next, id) => {
    const orderItem = await db_1.default.getOrderItemByID(id);
    if (!orderItem) {
        res.status(404).send('Order Item not found');
    }
    req.orderItem = orderItem;
    next();
});
orderItemRouter.post('/', async (req, res) => {
    await db_1.default.insertOrderItem(req.body.quantity, req.body.price, req.body.orderID, req.body.productID);
    res.status(200).send('Order item created');
});
orderItemRouter.get('/:orderItemID', async (req, res) => {
    res.send(req.orderItem);
});
orderItemRouter.put('/:orderItemID', async (req, res) => {
    if (req && req.orderItem && req.orderItem.id) {
        await db_1.default.updateOrderItem(req.orderItem.id, req.body.quantity, req.body.price);
        res.status(200).send('Order Item updated');
    }
});
orderItemRouter.delete('/:orderItemID', async (req, res) => {
    if (req && req.orderItem && req.orderItem.id) {
        await db_1.default.deleteOrderItem(req.orderItem.id);
        res.status(200).send('Order Item Deleted');
    }
});
exports.default = orderItemRouter;
//# sourceMappingURL=orderItem.js.map