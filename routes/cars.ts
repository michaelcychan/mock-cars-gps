import { Router } from "express";
import { getSingleCar } from "../controllers/cars/getSingleCar";
import { checkCarId } from "../controllers/cars/utils/checkCarId";
import { getNearCar } from "../controllers/cars/getNearCar";


const carsRouter = Router();

carsRouter.get('/', async (req, res ) => {
  res.status(200).json({ message: "Cars endpoint" });
});

carsRouter.get('/:id', checkCarId, getSingleCar);

carsRouter.get('/:id/near/:time', checkCarId, getNearCar);

export default carsRouter;