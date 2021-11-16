const db = require('./db/index');
const registerRouter = require('./routes/register');
const express = require('express');
const app = express();
const port = 3000;
app.use('/register', registerRouter);
app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`);
});
//# sourceMappingURL=index.js.map