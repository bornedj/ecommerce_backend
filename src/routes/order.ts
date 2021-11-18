import { Router, Response, Request, NextFunction } from "express";
import db from "../db/db";
import { CreateOrderRequest, GetOrderByID, UpdateOrderRequest } from "src/types";

// create the order router
const orderRouter = Router();

// order params
orderRouter.param('orderID', async (req: GetOrderByID, res: Response, next: NextFunction, id: number) => {
    const order = await db.getOrderByID(id);
    if (!order) {
        res.status(404).send("Order not found");
        return;
    }
    req.order = order;
    next();
})

// order CRUD
//create
orderRouter.post('/', async (req: CreateOrderRequest, res: Response) => {
    await db.insertOrder(req.body.userID, req.body.total, req.body.status);
    res.status(201).send('New Order Created')
})

// read
//get all orders
orderRouter.get('/', async (_: Request, res: Response) => {
    res.send(await db.getAllOrders());
})

// get specific order
orderRouter.get('/:orderID', (req: GetOrderByID, res: Response) => {
    if (req && req.order && req.order.id) {
        res.status(200).send(req.order);
    }
})

// update order
orderRouter.put('/:orderID', async (req: UpdateOrderRequest, res: Response) => {
    if (req && req.order && req.order.id) {
        await db.updateOrder(req.order.id, req.body.status, req.body.total)
        res.status(200).send('Order updated')
    }
})

// delete order
orderRouter.delete('/:orderID', async (req: GetOrderByID, res: Response) => {
    if (req && req.order && req.order.id) {
        await db.deleteOrder(req.order.id)
        res.status(200).send('Order deleted')
    }
})

export default orderRouter;