const nodemailer = require("nodemailer");
require('dotenv').config()

const sendEmail = async (req, res) => {
    const { name, email, message } = req.body
    // let testAccount = await nodemailer.createTestAccount()

    //connect with the SMTP
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email", // SMTP server address (usually mail.your-domain.com)
        port: 587, // Port for SMTP (usually 465)
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `${name} <${email}>`, // sender address
            to: "shreyasspoojary17@gmail.com", // list of receivers
            subject: `Message from ${name} - ${email}`, // Subject line
            text: message, // plain text body
        });

        console.log("Message sent:", info.messageId);

        res.status(200).json(info)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

module.exports = sendEmail;