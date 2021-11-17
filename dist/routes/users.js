"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const userRouter = (0, express_1.Router)();
userRouter.param('userID', async (req, res, next, id) => {
    const query = await db_1.default.selectUserByID(id);
    if (!query) {
        res.status(404).send('User not found');
        return;
    }
    req.user = query;
    next();
});
userRouter.get('/', async (_, res) => {
    const query = await db_1.default.getAllProducts();
    res.status(200).send(query);
});
userRouter.get('/:userID', (req, res) => {
    res.status(200).send(req.user);
});
userRouter.put('/:userID', async (req, res) => {
    await db_1.default.updateUser(req.body.id, req.body.firstName, req.body.lastName, req.body.password, req.body.email);
    res.status(204).send('user updated');
});
exports.default = userRouter;
//# sourceMappingURL=users.js.map