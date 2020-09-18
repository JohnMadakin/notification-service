import express from 'express';
import { validateToken } from '../../../middleware/user.auth';

const router = express.Router();

/*
@description Below all APIs are private APIs protected for Access Token
*/
router.use('/', validateToken);

router.post('/message');

export default router;
