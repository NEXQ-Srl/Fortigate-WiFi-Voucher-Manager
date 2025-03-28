import nodemailer from 'nodemailer';
import { Mail } from '../interfaces/mail';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendMail = async (mail: Mail): Promise<void> => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: mail.to,
            subject: mail.subject,
            //text: mail.text
            html: mail.text,
        });

        console.log(`📧 Email sent to  ${mail.to}`);
    } catch (error) {
        //console.error('Errore nell\'invio della mail:', error);
        throw new Error('Error while sending the email');
    }
};