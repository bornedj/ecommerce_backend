import { Router, Response, NextFunction } from "express";
import { CreateOrderItemRequest, GetOrderItemByID } from "../types";
import db from "../db/db";

// create the router
const orderItemRouter = Router();

// setup params
orderItemRouter.param('orderItemID', async (req: GetOrderItemByID, res: Response, next: NextFunction, id: number) => {
    const orderItem = await db.getOrderItemByID(id);
    if (!orderItem) {
        res.status(404).send('Order Item not found');
    }
    req.orderItem = orderItem;
    next();
})

// CRUD
// create order items
orderItemRouter.post('/', async (req: CreateOrderItemRequest, res: Response) => {
   await db.insertOrderItem(req.body.quantity, req.body.price, req.body.orderID, req.body.productID);
   res.status(200).send('Order item created')
})

// get specific order item
orderItemRouter.get('/:orderItemID', async (req: GetOrderItemByID, res: Response) => {
    res.send(req.orderItem)
});

// update order item
orderItemRouter.put('/:orderItemID', async (req: GetOrderItemByID, res: Response) => {
    if (req && req.orderItem && req.orderItem.id) {
        await db.updateOrderItem(req.orderItem.id, req.body.quantity, req.body.price);
        res.status(200).send('Order Item updated')
    }
})

// delete order item
orderItemRouter.delete('/:orderItemID', async (req: GetOrderItemByID, res: Response) => {
    if (req && req.orderItem && req.orderItem.id) {
        await db.deleteOrderItem(req.orderItem.id);
        res.status(200).send('Order Item Deleted')
    }
})

export default orderItemRouter;