const db = require('../db');
const registerRouter = require('express').Router();
registerRouter.post('/', async (req, res, next) => {
    const query = await db.doesUserExist(req.body.email);
    if (query) {
        res.status(200).send('User already exists');
    }
    else {
        await db.insertUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        res.status(204).send(`New User: ${req.body.firstName} created.`);
    }
});
module.exports = registerRouter;
//# sourceMappingURL=register.js.map