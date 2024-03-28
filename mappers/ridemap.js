module.exports.rideMap = function rideMap(ride) {
    const passenger = ride.passengers.map((client) => {
        delete client.isFind;
        return client;
    });

    return {
        id: ride._id,
        time: ride.time,
        car: ride.car,
        driver: ride.driver,
        passengers: passenger,
        route: ride.route,
    }
}

