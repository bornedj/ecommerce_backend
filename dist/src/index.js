"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./routes/login"));
const register_1 = __importDefault(require("./routes/register"));
const products_1 = __importDefault(require("./routes/products"));
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const cart_1 = __importDefault(require("./routes/cart"));
const order_1 = __importDefault(require("./routes/order"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../public/swagger.json"));
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express_1.default.static("public"));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use('/register', register_1.default);
app.use('/login', login_1.default);
app.use('/products', products_1.default);
app.use('/users', users_1.default);
app.use('/cart', cart_1.default);
app.use('/order', order_1.default);
app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map