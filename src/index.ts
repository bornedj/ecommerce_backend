//importing the postgres connection
const db = require('./db/index')

//creating the express app
const express = require('express')
const app = express();
const port = 3000;

//adding the routes to the app

app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`)
})
