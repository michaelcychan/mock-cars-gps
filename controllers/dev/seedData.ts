import { type RequestHandler } from 'express';
import { pool } from '../../db/pool';

export const seedData: RequestHandler = async (req, res, next) => {
  try {
    await pool.query(`
      INSERT INTO gps_events (device_id, recorded_at, location, speed)
VALUES
-- 🚗 car_1 (stationary)
('car_1', '2026-03-19T08:00:00Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),
('car_1', '2026-03-19T08:00:10Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),
('car_1', '2026-03-19T08:00:20Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),
('car_1', '2026-03-19T08:00:30Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),
('car_1', '2026-03-19T08:00:40Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),
('car_1', '2026-03-19T08:00:50Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),
('car_1', '2026-03-19T08:01:00Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),
('car_1', '2026-03-19T08:01:10Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),
('car_1', '2026-03-19T08:01:20Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),
('car_1', '2026-03-19T08:01:30Z', ST_MakePoint(-0.1278, 51.5074)::geography, 0),

-- 🚙 car_2 (slow movement)
('car_2', '2026-03-19T08:00:00Z', ST_MakePoint(-0.1278, 51.5075)::geography, 5),
('car_2', '2026-03-19T08:00:10Z', ST_MakePoint(-0.1277, 51.5075)::geography, 5),
('car_2', '2026-03-19T08:00:20Z', ST_MakePoint(-0.1276, 51.5075)::geography, 6),
('car_2', '2026-03-19T08:00:30Z', ST_MakePoint(-0.1275, 51.5075)::geography, 6),
('car_2', '2026-03-19T08:00:40Z', ST_MakePoint(-0.1274, 51.5075)::geography, 7),
('car_2', '2026-03-19T08:00:50Z', ST_MakePoint(-0.1273, 51.5075)::geography, 7),
('car_2', '2026-03-19T08:01:00Z', ST_MakePoint(-0.1272, 51.5075)::geography, 8),
('car_2', '2026-03-19T08:01:10Z', ST_MakePoint(-0.1271, 51.5075)::geography, 8),
('car_2', '2026-03-19T08:01:20Z', ST_MakePoint(-0.1270, 51.5075)::geography, 9),
('car_2', '2026-03-19T08:01:30Z', ST_MakePoint(-0.1269, 51.5075)::geography, 9);
    `);
    next();
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).json({ message: 'Error seeding data' });
  }
};