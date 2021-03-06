//imports 
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import productsRouter from "./routes/products";
import express from 'express';
import userRouter from "./routes/users";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from '../public/swagger.json'
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')

//creating the express app
const app = express();
const port = process.env.PORT || 4001;

// adding middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'))
app.use(express.static("public"))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

//adding the routes to the app
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter)
app.use('/users', userRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)


//listening
app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`)
})

export default app;