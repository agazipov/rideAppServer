module.exports.rideMap = function rideMap(ride) {
    return {
        id: ride._id,
        time: ride.time,
        car: ride.car,
        driver: ride.driver,
        passengers: ride.passengers,
        route: ride.route,
    }
}

