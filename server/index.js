import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Path to the EJS template I created earlier
const templatePath = path.join(__dirname, '../src/templates/contact.ejs');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SENDER_SMTP_HOST,
    port: parseInt(process.env.EMAIL_SENDER_SMTP_PORT),
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_SENDER_SMTP_USER,
        pass: process.env.EMAIL_SENDER_SMTP_PASS
    }
});

app.post('/api/say-hi', async (req, res) => {
    try {
        const { senderEmail, name, message } = req.body;

        // Render the EJS template
        const html = await ejs.renderFile(templatePath, {
            name: 'Al-Amin', // recipient
            senderEmail: senderEmail || 'New Visitor',
            message: message || "Someone just clicked 'Say Hi' on your portfolio!"
        });

        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_SENDER_SMTP_FROM}>`,
            to: process.env.EMAIL_SENDER_SMTP_FROM, // Send to yourself
            subject: `New Say Hi Inquiry from ${name || 'Your Portfolio'}`,
            html: html
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
