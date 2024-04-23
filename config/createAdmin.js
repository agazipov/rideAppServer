const connection = require("../connectionDB/connection");
const Admin = require("../models/Admin");
const config = require("./config");

(async () => {
    const moksUsers = [{
        name: config.newAdmin.NAME,
        password: config.newAdmin.PASSWORD,
    }]
    await Admin.deleteMany();
    console.log(`connect to DB admin ${NAME} files`);

    for (const user of moksUsers) {
        const u = new Admin(user);
        await u.setPassword(user.password)
        await u.save();
    }

    connection.close();
    console.log('admin add in db');
})();