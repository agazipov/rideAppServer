const {rideMap} = require("../mappers/ridemap");
const Ride = require("../models/Ride");

module.exports.getRide = async function getRide(ctx, next) {
    // возвращает клинту массив поездок которые привязаны к данному евенту(маршруту)
    const request = ctx.request.body;
    if (!request) {
        return next(new Error('dont request'));
    }
    const rides = await Ride.find({ route: request.id });
    ctx.body = rides.map(rideMap);
}
