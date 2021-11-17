"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./routes/login"));
const register_1 = __importDefault(require("./routes/register"));
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/register', register_1.default);
app.use('/login', login_1.default);
app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map