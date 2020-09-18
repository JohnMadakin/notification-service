import express from 'express';
import login from '../../../controllers/login';

const router = express.Router();

export default router.post('/login', login);
