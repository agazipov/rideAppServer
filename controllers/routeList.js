const Route = require("../models/Route");
const { routerMapServer } = require('../mappers/routemap')

module.exports.routeList = async function routeList(ctx, next) {
    const startDate = new Date();
    // отдает маршруты с текущей даты
    const routes = await Route.find({ date: { $gte: startDate } });
    ctx.body = routes.map(routerMapServer);
}
