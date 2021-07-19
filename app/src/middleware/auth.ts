import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RequestWithUser extends Request {
   user: any;
}

export const auth = (
   req: RequestWithUser,
   res: Response,
   next: NextFunction
) => {
   //@ts-ignore
   const token = req.headers['authorization'].split(' ')[1];

   if (!token)
      return res.status(401).json({ error: 'No token in the headers' });

   jwt.verify(token, process.env.JWT_AT_SECRET as string, (err, user) => {
      if (err) return res.status(401).json({ error: 'Unauthorized token' });
      req.user = user;
      next();
   });
};
