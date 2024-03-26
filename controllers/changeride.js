const { passengerMap } = require("../mappers/passengerMap");
const { rideMap } = require("../mappers/ridemap");
const Client = require("../models/Client");
const Ride = require("../models/Ride");
const Route = require("../models/Route");

module.exports.changeRide = async function changeRide(ctx, next) {
    const requestChangeRide = ctx.request.body;

    const passengers = passengerMap(requestChangeRide);
    console.log('passenger: ', passengers);

    if (passengers.length !== 0) {
        for (const item of passengers) {
            // const client = await Client.findOne({phone: item.phone});
            if (!item.isFind) {
                const newClient = new Client(item);
                newClient.ride.push(requestChangeRide.id);
                await newClient.save();
            }
        }
        console.log('complite');
    }

    const ride = await Ride.replaceOne({_id: requestChangeRide.id}, rideMap(requestChangeRide));

    await Route.findByIdAndUpdate(requestChangeRide.route, {$inc: {seats: requestChangeRide.freeSeats}})

    ctx.body = ride;
}