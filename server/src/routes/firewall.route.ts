import { Router } from 'express';
import { Request, Response } from 'express';
import { checkAuth } from "../middleware/auth";
import { generateVoucherController, getVoucherController } from '../controllers/firewall.controller';

const router = Router();

router.post('/GenerateVoucher',checkAuth, generateVoucherController);
router.get('/GetVoucher',checkAuth, getVoucherController);

export default router;