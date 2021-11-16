const db = require('./db/index');
const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`);
});
//# sourceMappingURL=index.js.map