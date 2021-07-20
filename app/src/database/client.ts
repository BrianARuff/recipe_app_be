import { Pool } from 'pg';

function database(): Pool | undefined {
   if (process.env.NODE_ENV === 'production') {
      return new Pool({
         connectionString: process.env.DATABASE_URL,
         ssl: { rejectUnauthorized: false },
      });
   } else {
      return new Pool({
         user: process.env.PG_USER,
         password: process.env.PG_PASS,
         host: process.env.PG_HOST,
         port: process.env.PG_PORT as any,
         database: process.env.PG_DB,
         ssl: {
            rejectUnauthorized: false,
         },
         max: 25,
         idleTimeoutMillis: 30000,
         connectionTimeoutMillis: 30000,
      });
   }
}

database()?.connect();

export default database() as Pool;
