"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db');
const loginRouter = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy({}, {
    try: {}, catch(err) {
        return done(err);
    }
}));
loginRouter.post('/', (req, res, next) => {
    console.log("at login");
    res.send('at login');
});
module.exports = loginRouter;
//# sourceMappingURL=login.js.map