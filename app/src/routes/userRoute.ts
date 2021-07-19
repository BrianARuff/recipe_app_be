import express from 'express';
import database from '../database/client';
import { auth } from '../middleware/auth';

const userRouter = express.Router();

userRouter.get('/users', auth as any, (req, res) => {
   database.query(
      'SELECT user_id, user_name, user_email, user_admin FROM users;',
      (err, rows) => {
         if (err) {
            res.status(500).json({ err });
         } else {
            const { rows: users } = rows;
            res.status(200).json({ users });
         }
      }
   );
});

export default userRouter;
