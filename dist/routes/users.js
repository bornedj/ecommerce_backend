"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const userRouter = (0, express_1.Router)();
userRouter.get('/', async (_, res) => {
    const query = await db_1.default.getAllProducts();
    res.status(200).send(query);
});
exports.default = userRouter;
//# sourceMappingURL=users.js.map