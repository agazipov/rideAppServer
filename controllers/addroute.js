const { defaultRide_1, defaultRide_2 } = require('../libs/defaultState/defaultRides');
const { rideMap } = require('../mappers/ridemap');
const { routerMapServer, routerMapClient } = require('../mappers/routemap');
const Ride = require('../models/Ride');
const Route = require("../models/Route");

module.exports.addRoute = async function addRoute(ctx, next) {
    // календарь и сервер имеют разные типы данных которые надо приводить друг к другу
    const valueForm = ctx.request.body;
    
    const route = new Route(routerMapClient(valueForm));
    
    if (valueForm.default) {
        if (valueForm.title === 'Бак-Чел') {
            for (const iterator of defaultRide_1) {
                const newRide = {...iterator, route: route.id};
                await Ride.create(rideMap(newRide));
            }
        } else {
            for (const iterator of defaultRide_2) {
                const newRide = {...iterator, route: route.id};
                await Ride.create(rideMap(newRide));
            }
        }
        route.seats = 8;
    }

    route.save();

    ctx.body = routerMapServer(route);
}