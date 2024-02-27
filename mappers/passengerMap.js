module.exports.passengerMap = function passengerMap(ride) {
    if (ride.passengers.length === 0) null;

    return ride.passengers.filter((passenger) => passenger.name !== '').map((passenger) => ({
        name: passenger.name,
        phone: passenger.phone,
        route: ride.route,
        position: ride.position,
    }))
}

module.exports.returnClientPassengerMap = function returnClientPassengerMap(ride) {
    return {
        name: ride.name,
        phone: ride.phone,
        position: ''
    }
}