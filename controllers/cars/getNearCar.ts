import { type RequestHandler } from "express";
import { pool } from "../../db/pool";

const checkTimeFormat = (time: string | string[] | undefined): boolean => {
  if (!time || Array.isArray(time)) {
    return false;
  }
  try {
    const date = new Date(time);
    return !isNaN(date.getTime());
  } catch (error) {
    return false;
  }
}

export const getNearCar: RequestHandler = async (req, res, next) => {
  const { id, time } = req.params;

  if (!checkTimeFormat(time)) {
    return res.status(400).json({ message: "Invalid time format" });
  }
  try {
    const result = await pool.query(
      `WITH car_location AS (
    SELECT location
    FROM gps_events
    WHERE device_id = $1
      AND recorded_at BETWEEN
        $2::timestamptz - INTERVAL '10 seconds'
        AND
        $2::timestamptz + INTERVAL '10 seconds'
    ORDER BY recorded_at ASC
    LIMIT 1
  )
  SELECT
    g.device_id,
    g.speed,
    ST_AsGeoJSON(g.location) AS location,
    g.recorded_at
  FROM gps_events g
  CROSS JOIN car_location
  WHERE g.device_id <> $1
    AND g.recorded_at BETWEEN
      $2::timestamptz - INTERVAL '10 seconds'
      AND
      $2::timestamptz + INTERVAL '10 seconds'
    AND ST_DWithin(g.location, car_location.location, 50)
  ORDER BY g.recorded_at ASC`,
      [id, time]
    );

    const data = result.rows.map(row => ({
      ...row,
      location: JSON.parse(row.location)
    }));

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching car data:", error);
    res.status(500).json({ message: "Error fetching car data" });
  }
}