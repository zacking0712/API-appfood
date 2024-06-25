import express from "express";
import {
  addOrder,
  addRate,
  likeAndDisLike,
  likeOfRestaurant,
  likeOfUser,
  rateOfRes,
  rateOfUser,
} from "../controllers/resController.js";

const restaurantRouter = express.Router();

// like nhà hàng

restaurantRouter.post("/like&dislike", likeAndDisLike);

restaurantRouter.get("/likeOfRestaurant/:resId", likeOfRestaurant);

restaurantRouter.get("/likeOfUser/:userId", likeOfUser);

restaurantRouter.post("/addRate", addRate);

restaurantRouter.get("/rateOfRestaurant/:resId", rateOfRes);

restaurantRouter.get("/rateOfUser/:userId", rateOfUser);

restaurantRouter.post("/addOrder", addOrder);

export default restaurantRouter;
