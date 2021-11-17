const db = require('./db/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const port = process.env.PORT || 4001;
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.get('/', (req, res, next) => {
    res.status(200).send('This is a test');
});
app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`);
});
//# sourceMappingURL=index.js.map