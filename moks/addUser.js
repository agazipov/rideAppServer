const connection = require("../connectionDB/connection");
const Admin = require("../models/Admin");


(async () => {
    const moksUsers = [{
        name: "admin",
        password: "123",
    }]
    await Admin.deleteMany();
    console.log('connect to DB admin files');

    for (const user of moksUsers) {
        const u = new Admin(user);
        await u.setPassword(user.password)
        await u.save();
    }

    connection.close();
    console.log('admin add in db');
})();