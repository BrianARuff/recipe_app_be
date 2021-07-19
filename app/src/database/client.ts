import { Pool } from 'pg';

const database = new Pool({
   user: process.env.PG_USER || process.env.AWS_PG_USER,
   password: process.env.PG_PASS || process.env.AWS_PG_PASS,
   host: process.env.PG_HOST || process.env.AWS_PG_HOST,
   port: (process.env.PG_PORT as any) || (process.env.AWS_PG_PORT as any),
   database: process.env.PG_DB || process.env.AWS_PG_DB,
   ssl: {
      rejectUnauthorized: false,
   },
   max: 25,
   idleTimeoutMillis: 30000,
   connectionTimeoutMillis: 30000,
});

database.connect();

export default database;
