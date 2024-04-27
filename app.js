const path = require('node:path');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const { v4: uuid } = require('uuid');
const cors = require('@koa/cors')
const { routeList } = require('./controllers/routeList');
const { getRide } = require('./controllers/getride');
const { addRoute } = require('./controllers/addroute');
const { addRide } = require('./controllers/addride');
const { changeRide } = require('./controllers/changeride');
const { delRide } = require('./controllers/delride');
const { delRoute } = require('./controllers/delroute');
const { login } = require('./controllers/login');
const { getClient } = require('./controllers/getclient');
const { clients } = require('./controllers/clients');
const Session = require('./models/Session');
const Router = require('koa-router');
const mustBeAuthenticated = require('./libs/mustBeAuthenticated');
const { job } = require('./cron/dbSimulited/cronMocks');
const config = require('./config/config');
const mockGate = require('./libs/mockGate');

config.MOCK === 'true' && job.start();

app.use(cors());
app.use(bodyParser());
// app.use(static(path.join(__dirname, 'public')));

// содание токена
app.use((ctx, next) => {
    ctx.login = async function (user) {
        const token = uuid();
        await Session.create({ token, user, lastVisit: new Date() });
        return token;
    };
    return next();
});

// обработка ошибок
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.status) {
            ctx.status = err.status;
            ctx.body = { error: err.message };
        } else {
            console.error(err);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }
});

const router = new Router({ prefix: '/api' });

router.use(async (ctx, next) => {
    const header = ctx.request.get('Authorization');
    if (!header) return next();

    const token = header.split(' ')[1];
    // .replace(/"/g, '');
    if (!token) return next();

    const session = await Session.findOne({ token }).populate('user');
    if (!session) {
        ctx.throw(401, 'Неверный аутентификационный токен');
    }
    session.lastVisit = new Date();
    await session.save();

    ctx.user = session.user;
    return next();
});

router.get('/data', mockGate, routeList);

// вилка в гетрейд на различные респонсы в зависимости от токена
router.post('/ride', getRide);
router.get('/clients', mustBeAuthenticated, clients);
router.post('/getclient', mustBeAuthenticated, getClient);

// не создавать новый токен при повторном
router.post('/login', login);

router.post('/addroute', mustBeAuthenticated, addRoute);
router.post('/addride', mustBeAuthenticated, addRide);

router.put('/change', mustBeAuthenticated, changeRide);

router.delete('/delride', mustBeAuthenticated, delRide);
router.delete('/delroute', mustBeAuthenticated, delRoute);

app.use(router.routes());

// this for HTML5 history in browser
// const fs = require('node:fs');
// const index = fs.readFileSync(path.join(__dirname, 'public/index.html'));
// app.use(async (ctx, next) => {
//     if (!ctx.url.startsWith('/api')) {
//         ctx.set('content-type', 'text/html');
//         ctx.body = index;
//     }
// });

module.exports = app;