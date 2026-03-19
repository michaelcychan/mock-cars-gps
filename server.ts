import express from "express";
import { rootHealthCheck } from "./controllers/rootHealthCheck";
import { seedData } from "./controllers/dev/seedData";
import { selectAllData } from "./controllers/dev/selectAllData";
import devRouter from "./routes/dev";
import carsRouter from "./routes/cars";

const app = express();
const port = 8080;

app.get("/", (req, res, next) => {
  rootHealthCheck(req, res, next);
});

app.use("/dev", devRouter);
app.use('/cars', carsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});