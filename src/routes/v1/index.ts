import express from 'express';
import login from '../../controllers/login';

const router = express.Router();

router.use('/login', login);

export default router;
