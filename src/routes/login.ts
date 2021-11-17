import { doesNotMatch } from "assert";

//imports
const db = require('../db');
const loginRouter = require('express').Router();
const passport = require('passport')
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
    async (username: string, password: string, done) => {
        try {
            
        } catch(err) {
            return done(err);
        }
    }
}));

loginRouter.post('/', (req,res,next) => {
    console.log("at login")
    res.send('at login')
})

module.exports = loginRouter;// exporting the loginRouter