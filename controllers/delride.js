const Ride = require("../models/Ride");
const Route = require("../models/Route");

module.exports.delRide = async function delRide(ctx, next) {
    const requestDelRide = ctx.request.body;
    const ride = await Ride.deleteOne({_id: requestDelRide.id});
    await Route.findByIdAndUpdate(requestDelRide.route, {$inc: {seats: requestDelRide.freeSeats}})
    ctx.body = ride;
}