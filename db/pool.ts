import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'gps_user',
  host: 'localhost',
  database: 'gps_db',
  password: 'password',
  port: 5432,
});