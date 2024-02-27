const connection = require("../connectionDB/connection");
const Ride = require("../models/Ride");
const Route = require("../models/Route");
const routeMoks = require("./routeMoks");
const tipsMoks = require("./tipsMoks");

(async () => {
    await Route.deleteMany();
    await Ride.deleteMany();
    console.log('connect to DB moks files');
    const idRouteMap = [];
    for (const route of routeMoks) {
        const r = new Route(route);
        await r.save();
        idRouteMap.push(r._id);
    }
    for (const ride of tipsMoks) {
        await Ride.create({
            time: ride.time,
            car: ride.car,
            driver: ride.driver,
            passengers: ride.passengers,
            route: idRouteMap[0],
        });

    }
    connection.close();
})();