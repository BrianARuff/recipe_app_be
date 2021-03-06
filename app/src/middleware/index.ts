import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import authRouter from '../routes/authRoutes';
import dashboardRouter from '../routes/dashboardRoute';
import userRouter from '../routes/userRoute';

export default (app: Express) => {
   app.use(helmet());
   app.use(morgan('dev'));
   app.use(cors());
   app.use(express.json());
   app.use('/api/auth', authRouter);
   app.use('/api', dashboardRouter);
   app.use('/api', userRouter);
};
