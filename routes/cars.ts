import { Router } from "express";
import { getSingleCar } from "../controllers/cars/getSingleCar";


const carsRouter = Router();

carsRouter.get('/:id', async (req, res, next) => {
  await getSingleCar(req, res, next);
});

export default carsRouter;