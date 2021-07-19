import express from 'express';
import { auth } from '../middleware/auth';

const dashboardRouter = express.Router();

dashboardRouter.post('/dashboard', auth as any, (req, res) => {
   return res.json({ success: true });
});

export default dashboardRouter;
