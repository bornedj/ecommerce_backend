import { doesNotMatch } from "assert";

//imports
const db = require('../db');
const loginRouter = require('express').Router();
const passport = require('passport')
const LocalStrategy = require('passport-local');


module.exports = loginRouter;// exporting the loginRouter