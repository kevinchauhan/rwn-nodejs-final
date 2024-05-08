import nodemailer from 'nodemailer'
import { EmailTemplate } from './EmailTemplate.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: 'rwnkevinchauhan@gmail.com',
        pass: 'hgbk siie zlnh ofrv'
    }
});

const emailService = async (otp, email, name) => {
    const tem = EmailTemplate(otp, name)
    const options = {
        from: '"Kevin Chauhan"', // sender address
        to: `${email}`, // list of receivers
        subject: "EMAIL VERIFICATION", // Subject line
        html: tem
    }

    // send mail with defined transport object
    const info = await transporter.sendMail(options);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


export default emailService