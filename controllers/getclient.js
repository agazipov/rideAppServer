const { returnClientPassengerMap } = require('../mappers/passengerMap');
const Client = require('../models/Client');

module.exports.getClient = async function getClient(ctx, next) {
    const clientRequest = ctx.request.body;
    const client = await Client.findOne({ phone: clientRequest.phone });
    if (!client) {
        // ctx.status = 204;
        // ctx.throw(404, "dont find client");
        ctx.body = {message: 'dont client'};
    } else {
        ctx.body = returnClientPassengerMap(client);
    }
}