import type { RequestHandler } from "express";

export const checkCarId: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing car ID" });
  }
  if (typeof id !== "string" || !id.trim().startsWith("car_")) {
    return res.status(400).json({ message: "Invalid car ID" });
  }
  next();
}