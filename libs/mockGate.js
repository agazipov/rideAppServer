const config = require("../config/config");
const fs = require('node:fs/promises');
const path = require('path');
const { routerMapServer } = require("../mappers/routemap");

module.exports = async function mockGate(ctx, next) {
    if (config.MOCK === 'true') {
        const pathName = path.join(__dirname, '..', './cron/dbSimulited', 'event.json')

        let readJson = await fs.readFile(pathName, (err) => {
			if (err) throw err;
		})
        ctx.body = readJson;
        return;
    }
    return next();
}
