import { Request, Response } from 'express';
import { sendMail } from '../services/mail.service';
import { Mail } from '../interfaces/mail';

export const sendEmailController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { to, subject, text } = req.body;

        // Validazione dei parametri
        if (!to || !subject || !text) {
            res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
            return;
        }

        const mail: Mail = { to, subject, text };
        await sendMail(mail);

        res.status(200).json({ message: 'Email inviata con successo!' });
    } catch (error) {
        res.status(500).json({ error: 'Errore durante l\'invio dell\'email, errore: ' });
    }
};