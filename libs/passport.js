const {KoaPassport} = require('koa-passport');
const passport = new KoaPassport;
const localStrategy = require('./strategy/local');

passport.use(localStrategy);

module.exports = passport;