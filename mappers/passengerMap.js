module.exports.passengerMap = function passengerMap(ride) {
    return ride.passengers.filter((passenger) => passenger.name !== '').map((passenger) => ({
        name: passenger.name,
        phone: passenger.phone,
        isFind: passenger.isFind,
        route: ride.route,
    }))
}

module.exports.clientByPhoneMap = function clientByPhoneMap(client) {
    return {
        name: client.name,
        phone: client.phone,
        position: ''
    }
}

module.exports.passengersDBmap = function passengersDBmap(page) {
    const content = page.docs.map((client) => ({
        id: client.id,
        name: client.name,
        phone: client.phone,
        ride: client.ride
    }))
    return {
        content,
        totalPages: page.totalPages,
        page: page.page,
        prevPage: page.prevPage,
        nextPage: page.nextPage
    }
}