import { type RequestHandler } from 'express';
import { pool } from '../db/pool';

export const rootHealthCheck: RequestHandler = async (req, res) => {
  console.log('Received health check request...');
  const result = await pool.query('SELECT NOW()');
  console.log('Database connection successful. Current time:', result.rows[0].now);
  res.status(200).json({ status: 'ok', time: result.rows[0].now });
}