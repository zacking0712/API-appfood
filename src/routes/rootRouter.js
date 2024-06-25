import express from "express";
import restaurantRouter from "./restaurantRouter.js";

const rootRouter = express.Router();

rootRouter.use("/restaurant", restaurantRouter);

export default rootRouter;
