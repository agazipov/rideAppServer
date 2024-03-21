const Client = require("../models/Client");
const { passengersDBmap } = require("../mappers/passengerMap");

module.exports.clients = async function clients(ctx, next) {
    const request = ctx.request.body;

    let option = {
        page: request.page,
        limit: 5,
    };

    const result = await Client.paginate({}, option);
    // console.log('result', result);
    ctx.body = passengersDBmap(result);
}
