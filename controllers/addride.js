const { passengerMap } = require("../mappers/passengerMap");
const { rideMap } = require("../mappers/ridemap");
const Client = require("../models/Client");
const Ride = require("../models/Ride");
const Route = require("../models/Route");

module.exports.addRide = async function addRide(ctx, next) {
    const requestAddRide = ctx.request.body;

    const ride = new Ride(rideMap(requestAddRide));

    const passengers = passengerMap(requestAddRide);

    if (passengers) {
        for (const item of passengers) {
            const client = new Client(item);
            client.ride.push(ride.id);
            await client.save();
        }
    }

    await ride.save();

    // добавить исключение, что-бы не делать лишний запрос когда данные не менялись
    await Route.findByIdAndUpdate(requestAddRide.route, {$inc: {seats: requestAddRide.freeSeats}});

    ctx.body = ride;
}