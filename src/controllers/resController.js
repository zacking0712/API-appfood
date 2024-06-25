import initModels from "../models/init-models.js";
import { responseSend } from "../config/response.js";
import sequelize from "../models/connect.js";

let model = initModels(sequelize);

export const likeAndDisLike = async (req, res) => {
  let { userId, resId } = req.body;

  const resExist = await model.restaurant.findOne({
    where: { res_id: resId },
  });
  if (!resExist) {
    responseSend(res, "", "Nhà hàng không tồn tại", 404);
  }
  const userExist = await model.nguoi_dung.findOne({
    where: { user_id: userId },
  });

  const likeExist = await model.like_res.findOne({
    where: { user_id: userId, res_id: resId },
  });
  if (likeExist) {
    // Dislike
    if (!likeExist.isLike) {
      await model.like_res.update(
        { ...likeExist, isLike: 1 },
        {
          where: {
            like_res_id: likeExist.like_res_id,
          },
          returning: true,
        }
      );
      responseSend(res, "", "DisLike thành công", 200);
    }

    // Like
    if (likeExist.isLike) {
      await model.like_res.update(
        { ...likeExist, isLike: 0 },
        {
          where: {
            like_res_id: likeExist.like_res_id,
          },
          returning: true,
        }
      );
      responseSend(res, "", "Like thành công", 200);
    }
  }
};

export const likeOfRestaurant = async (req, res) => {
  let { resId } = req.params;

  const resExist = await model.restaurant.findOne({
    where: {
      res_id: resId,
    },
  });
  if (!resExist) {
    responseSend(res, "", "Nhà hàng không tồn tại", 403);
  }

  const likeOfRes = await model.like_res.findAll({
    where: {
      res_id: resExist.res_id,
      isLike: 1,
    },
  });
  responseSend(res, { ...resExist.dataValues, likeOfRes }, "Thành công", 200);
};

export const likeOfUser = async (req, res) => {
  let { userId } = req.params;

  const userExist = await model.nguoi_dung.findOne({
    where: {
      user_id: userId,
    },
  });
  if (!userExist) return responseSend(res, "", "Người dùng không tồn tại", 403);

  const likeOfUser = await model.like_res.findAll({
    where: {
      isLike: 1,
      user_id: userExist.user_id,
    },
  });
  responseSend(res, { ...userExist.dataValues, likeOfUser }, "Thành công", 200);
};

export const addRate = async (req, res) => {
  let { userId, resId, amount } = req.body;

  const resExist = await model.restaurant.findOne({
    where: {
      res_id: resId,
    },
  });
  if (!resExist) return responseSend(res, "", "Nhà hàng không tồn tại", 403);

  let newRate = {
    user_id: userId,
    res_id: resId,
    amount,
    date_res: new Date(),
  };

  const createRate = await model.rate_res.create(newRate);

  const data = await model.rate_res.findOne({
    where: {
      rate_res_id: createRate.rate_res_id,
    },
  });

  responseSend(res, data, "Thành công", 200);
};

export const rateOfRes = async (req, res) => {
  let { resId } = req.params;

  const resExist = await model.restaurant.findOne({
    where: {
      res_id: resId,
    },
  });
  if (!resExist) return responseSend(res, "", "Nhà hàng không tồn tại", 403);

  let rateOfRes = await model.rate_res.findAll({
    where: {
      res_id: resExist.res_id,
    },
  });
  responseSend(res, { ...resExist.dataValues, rateOfRes }, "Thành Công", 200);
};

export const rateOfUser = async (req, res) => {
  let { userId } = req.params;

  const userExist = await model.nguoi_dung.findOne({
    where: {
      user_id: userId,
    },
  });
  if (!userExist) return responseSend(res, "", "Người dùng không tồn tại", 403);

  let rateOfUser = await model.rate_res.findAll({
    where: {
      user_id: userExist.user_id,
    },
  });
  responseSend(res, { ...userExist.dataValues, rateOfUser }, "Thành Công", 200);
};

export const addOrder = async (req, res) => {
  let { userId, foodId, amount } = req.body;

  const foodExist = await model.food.findOne({
    where: {
      food_id: foodId,
    },
  });
  if (!foodExist) return responseSend(res, "", "Món ăn không tồn tại", 403);

  let newOrder = {
    user_id: userId,
    food_id: foodId,
    amount,
    code: "ORDERDEF",
    arr_sub_id: "SUBDEF",
  };

  let createOrder = await model.order_.create(newOrder);

  let data = await model.order_.findAll({
    where: {
      order_id: createOrder.order_id,
    },
  });
  responseSend(res, data, "Thêm món thành công", 200);
};
