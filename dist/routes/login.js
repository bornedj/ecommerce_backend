"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const loginRouter = (0, express_1.Router)();
loginRouter.post('/', async (req, res) => {
    const flag = await db_1.default.loginUser(req.body.email, req.body.password);
    if (flag) {
        res.status(200).send('User Logged in');
    }
    else {
        res.status(401).send('Login invalid');
    }
});
exports.default = loginRouter;
//# sourceMappingURL=login.js.map