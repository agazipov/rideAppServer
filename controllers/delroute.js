const Route = require("../models/Route");

module.exports.delRoute = async function delRoute(ctx, next) {
    const route = ctx.request.body;
    const deleteRote = await Route.deleteOne({_id: route.id});
    ctx.body = deleteRote;
}