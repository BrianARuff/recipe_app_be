import 'dotenv/config';
import express from 'express';
import middleware from './middleware/index';

const app = express();

middleware(app);

app.listen(process.env.PORT || 3000, () =>
   console.log('Listening on port ' + process.env.PORT)
);
