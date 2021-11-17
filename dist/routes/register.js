"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db/db"));
const express_1 = require("express");
const registerRouter = (0, express_1.Router)();
registerRouter.post('/', async (req, res) => {
    const query = await db_1.default.doesUserExist(req.body.email);
    if (query) {
        res.status(200).send('User already exists');
    }
    else {
        await db_1.default.insertUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        res.status(201).send('New User Created');
    }
});
exports.default = registerRouter;
//# sourceMappingURL=register.js.map