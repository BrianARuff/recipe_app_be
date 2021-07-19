import 'dotenv/config';
import express from 'express';
import middleware from './middleware/index';

const app = express();

middleware(app);

app.listen(3000, () => console.log('Listening on port 3000'));
