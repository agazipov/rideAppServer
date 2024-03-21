const { default: mongoose } = require("mongoose");
const connection = require("../connectionDB/connection");
const mongoosePagination = require('mongoose-paginate-v2');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: 'Этот номер занят другим пользователем'
        // validate: [
        //     {
        //         validator(value) {
        //             return /\+?\d{6,14}/.test(value);
        //         },
        //         message: 'Неверный формат номера телефона.',
        //     },
        // ],
    },
    note: {
        type: String,
    },
    ride: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride'
    }]
});

clientSchema.plugin(mongoosePagination);

module.exports = connection.model('Client', clientSchema);