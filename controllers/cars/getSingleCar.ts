import { type RequestHandler } from "express";
import { pool } from "../../db/pool";

export const getSingleCar: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // ST_AsText(location) => returns "POINT(lon lat)"
    // ST_AsGeoJSON(location) => returns {"type":"Point","coordinates":[lon, lat]}
    const result = await pool.query(
      `SELECT device_id, recorded_at, ST_AsGeoJSON(location) AS location, speed
       FROM gps_events
       WHERE device_id = $1
       ORDER BY recorded_at ASC`,
      [id]
    );
    const formattedResult = result.rows.map(row => ({
      ...row,
      location: JSON.parse(row.location)
    }));

    res.status(200).json({ data: formattedResult });
  } catch (error) {
    console.error("Error fetching car data:", error);
    res.status(500).json({ message: "Error fetching car data" });
  }
}