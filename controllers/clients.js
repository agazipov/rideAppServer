const Client = require("../models/Client");
const { passengersDBmap } = require("../mappers/passengerMap");

module.exports.clients = async function clients(ctx, next) {
    let option = {
        page: ctx.query.page,
        limit: 2,
    };

    const result = await Client.paginate({}, option);
    ctx.body = passengersDBmap(result);
}
