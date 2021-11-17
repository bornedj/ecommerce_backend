//imports 
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import productsRouter from "./routes/products";
import express from 'express';
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')

//creating the express app
const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'))

//adding the routes to the app
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter)


//listening
app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`)
})

export default app;