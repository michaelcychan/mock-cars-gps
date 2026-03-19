import type { RequestHandler } from 'express';
import { pool } from '../../db/pool';

export const selectAllData: RequestHandler = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT device_id, recorded_at, ST_AsText(location) AS location, speed FROM gps_events ORDER BY recorded_at');
    console.log('All GPS events:');
    const formatted = result.rows.map(row => {
      console.log(`Device: ${row.device_id}, Time: ${row.recorded_at}, Location: ${row.location}, Speed: ${row.speed} km/h`);
    });
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error('Error selecting all data:', error);
    res.status(500).json({ message: 'Error selecting all data' });
  }

}