const config = require("../config/config");
const fs = require('node:fs/promises');
const path = require('path');
const { routerMapServerMocks } = require("../mappers/routemap");

module.exports = async function mockGate(ctx, next) {
    if (config.MOCK === 'true') {
        let pathName = '';
        if (ctx.method === 'GET') {
            pathName = path.join(__dirname, '..', './cron/dbSimulited', 'event.json');
            const readJson = await fs.readFile(pathName, 'utf-8');
            const data = JSON.parse(readJson).map(routerMapServerMocks);
            ctx.body = data;
            return;
        }

        pathName = path.join(__dirname, '..', './cron/dbSimulited', 'ride.json');
        const request = ctx.request.body;
        if (!request) {
            return next(new Error('dont request'));
        }

        const readJson = await fs.readFile(pathName, 'utf-8');
        const data = JSON.parse(readJson).filter(ride => ride.route === request.id);
        ctx.body = data;
        return;
    }
    return next();
}