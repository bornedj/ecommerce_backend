// importing the database connection
const db = require('../db');

//importing the stuff for express
const registerRouter = require('express').Router();

registerRouter.post('/', async (req:any, res:any, next:any) => {
    const query = await db.doesUserExist(req.body.email);// searching for user currently in database

    if (query) {
        res.status(200).send('User already exists')
    } else {
        await db.insertUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        res.status(204).send(`New User: ${req.body.firstName} created.`);
    }

})

module.exports = registerRouter;// exporting the router