import 'dotenv/config';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import database from '../database/client';
import bcryptJS from 'bcryptjs';

const authRouter = express.Router();

authRouter.post('/login', (req: Request, res: Response) => {
   try {
      const {
         user_email: email,
         user_password: password,
         user_name: name,
      } = req.body;
      if (!email || !password)
         res.status(400).json({ error: 'Missing email or password' });

      const accessToken = jwt.sign(
         { email, name },
         process.env.JWT_AT_SECRET as string,
         { expiresIn: '5m' }
      );

      const refreshToken = jwt.sign(
         { email, password },
         process.env.JWT_RT_SECRET as string,
         { expiresIn: '7d' }
      );

      database.query(
         'SELECT user_id, user_name, user_email, user_password FROM USERS WHERE user_email = $1',
         [email],
         async (err, result) => {
            if (err) {
               return res.status(500).json({ error: 'Database error' });
            } else {
               if (result.rows.length === 0) {
                  return res
                     .status(401)
                     .json({ error: 'Invalid email or password' });
               }
               const isValidPassword = await bcryptJS.compare(
                  password,
                  result.rows[0].user_password
               );
               if (isValidPassword && result.rows.length > 0) {
                  res.status(200).json({
                     accessToken,
                     refreshToken,
                     user: result.rows[0],
                  });
               }
               return res
                  .status(401)
                  .json({ error: 'Invalid email or password' });
            }
         }
      );

      //   res.status(200).json({ accessToken, refreshToken });
   } catch (error) {
      if (error) res.status(500).json({ error });
   }
});

authRouter.post('/register', async (req: Request, res: Response) => {
   const {
      user_email: email,
      user_password: password,
      user_name: name,
   } = req.body;

   if (!email || !password || !name)
      res.status(400).json({ error: 'Missing email, username or password' });

   try {
      const accessToken = jwt.sign(
         { email, name },
         process.env.JWT_AT_SECRET as string,
         { expiresIn: '5m' }
      );

      const refreshToken = jwt.sign(
         { email, password },
         process.env.JWT_RT_SECRET as string,
         { expiresIn: '7d' }
      );

      const salt = await bcryptJS.genSalt(10);
      const PSWhash = await bcryptJS.hash(password, salt);

      database
         .query(
            'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *;',
            [name, email, PSWhash]
         )
         .then((result) => {
            return res
               .status(200)
               .json({ accessToken, refreshToken, user: result.rows[0] });
         })
         .catch((error) => {
            return res.status(500).json({ error });
         });
   } catch (error) {
      if (error) return res.status(500).json({ error });
   }
});

authRouter.post('/refresh', (req: Request, res: Response) => {
   const { email, password } = req.body;
   const { authorization: refreshToken } = req.headers;
   if (!refreshToken) return res.status(400).json({ error: 'Missing token' });
   const accessToken = jwt.sign(
      { email, password },
      process.env.JWT_AT_SECRET as string,
      { expiresIn: '5m' }
   );
   res.status(200).json({ accessToken });
});

export default authRouter;
