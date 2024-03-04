const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

async function sendMail({ to, subject, text, html }) {
    const mailOptions = {
        from: process.env.MAIL_FROM,
        to,
        subject,
        text,
        html,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Mail sent: ', result);
    } catch (error) {
        console.error('Error sending mail: ', error);
    }
}

async function notifyUsersNewMovie(movie) {
    const { User } = this.server.models();
    const users = await User.query();

    const subject = `Nouveau film ajouté : ${movie.title}`;
    const message = `Découvrez notre nouveau film "${movie.title}", maintenant disponible dans notre bibliothèque.`;

    users.forEach(user => {
        const mailOptions = {
            to: user.email,
            subject: subject,
            text: message,
        };

        sendMail(mailOptions).catch(error => {
            console.error(`Failed to send mail to ${user.email}: ${error.message}`);
        });
    });
}
module.exports = { notifyUsersNewMovie, sendMail };
