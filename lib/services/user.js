'use strict';

const { Service } = require('@hapipal/schmervice');
const iut_encrypt = require('@castanie-valentin/iut-encrypt');
const Jwt = require("@hapi/jwt");
const {sendMail} = require("./mailService");


module.exports = class UserService extends Service {

    async create(user) {

        const {User} = this.server.models();

        user.password = iut_encrypt.sha1(user.password)

        const mailOptions = {
            to: user.email,
            subject: 'Bienvenue dans notre application!',
            text: `Bonjour ${user.name}, bienvenue dans notre application! Nous sommes heureux de vous compter parmi nous.`,
            html: `<p>Bonjour ${user.name}, bienvenue dans notre application! Nous sommes heureux de vous compter parmi nous.</p>`
        };

        await sendMail(mailOptions);

        return User.query().insertAndFetch(user);
    }

    list(){
        const { User } = this.server.models();
        return User.query();
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    modify(userId, updateData) {
        const { User } = this.server.models();
        return User.query().patchAndFetchById(userId, updateData);
    }

    async authenticate(mail, password) {
        const {User} = this.server.models();
        const user = await User.query().findOne({mail});

        if (!user) {
            return null;
        }

        const match = iut_encrypt.compareSha1(password, user.password);

        if (match) {
            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.mail,
                    scope: user.scope
                },
                {
                    key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );
            return 'Bearer ' + token;
        } else {
            return null;
        }
    }
}
