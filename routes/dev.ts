import { Router} from 'express';
import { seedData } from '../controllers/dev/seedData';
import { selectAllData } from '../controllers/dev/selectAllData';

const devRouter = Router();

devRouter.get('/seed-data', async (req, res, next) => {
  await seedData(req, res, next);
  res.status(200).json({ message: "Done" });
});

devRouter.get('/all-data', async (req,res,next) => {
  await selectAllData(req,res,next);
  res.status(200).json({ message: "Done" });
});

export default devRouter;
