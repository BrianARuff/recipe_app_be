import 'dotenv/config';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {auth} from "../middleware/auth"

const authRouter = express.Router();

authRouter.post('/login', (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) res.status(400).json({ error: 'Missing email or password' });
      
      const accessToken = jwt.sign(
         { email, password },
         process.env.JWT_AT_SECRET as string,
         { expiresIn: '20s' }
      );
      
      const refreshToken = jwt.sign({email, password}, process.env.JWT_RT_SECRET as string, { expiresIn: '1d' });
      
      res.status(200).json({ accessToken, refreshToken });
   } catch (error) {
      if (error) res.status(500).json({ error });
   }
});

authRouter.post('/refresh', (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { authorization: refreshToken } = req.headers;
    if (!refreshToken) return res.status(400).json({ error: 'Missing token' });
    const accessToken = jwt.sign({email, password} , process.env.JWT_AT_SECRET as string, { expiresIn: '5m' });
    res.status(200).json({ accessToken });
});

export default authRouter;
