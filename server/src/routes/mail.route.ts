import { Router } from 'express';
import { Request, Response } from 'express';
import { sendEmailController } from '../controllers/mail.controller';
import { checkAuth } from "../middleware/auth"; // 🔹 Middleware per l'autenticazione

const router = Router();

router.post('/send', (req: Request, response: Response) => {
    //console.log(req.header("authorization"));
    checkAuth(req, response, () => sendEmailController(req, response)); // 🔹 Protegge la rotta con l'autenticazione
})

export default router;
