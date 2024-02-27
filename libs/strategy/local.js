const Admin = require('../../models/Admin');
const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    { usernameField: 'name', session: false },
    async function (name, password, done) {
        try {
            const admin = await Admin.findOne({ name });
            if (!admin) return done(null, false, 'Нет такого пользователя');

            const check = await admin.checkPassword(password);
            if (!check) return done(null, false, 'Неверный пароль');

            return done(null, admin, 'Здарова отец');
        } catch (error) {
            done(error);
        }
    },
);