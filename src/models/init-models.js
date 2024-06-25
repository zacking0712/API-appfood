import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _food from  "./food.js";
import _food_type from  "./food_type.js";
import _like_res from  "./like_res.js";
import _nguoi_dung from  "./nguoi_dung.js";
import _order_ from  "./order_.js";
import _rate_res from  "./rate_res.js";
import _restaurant from  "./restaurant.js";
import _sub_food from  "./sub_food.js";

export default function initModels(sequelize) {
  const food = _food.init(sequelize, DataTypes);
  const food_type = _food_type.init(sequelize, DataTypes);
  const like_res = _like_res.init(sequelize, DataTypes);
  const nguoi_dung = _nguoi_dung.init(sequelize, DataTypes);
  const order_ = _order_.init(sequelize, DataTypes);
  const rate_res = _rate_res.init(sequelize, DataTypes);
  const restaurant = _restaurant.init(sequelize, DataTypes);
  const sub_food = _sub_food.init(sequelize, DataTypes);

  order_.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(order_, { as: "order_s", foreignKey: "food_id"});
  sub_food.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(sub_food, { as: "sub_foods", foreignKey: "food_id"});
  food.belongsTo(food_type, { as: "type", foreignKey: "type_id"});
  food_type.hasMany(food, { as: "foods", foreignKey: "type_id"});
  like_res.belongsTo(nguoi_dung, { as: "user", foreignKey: "user_id"});
  nguoi_dung.hasMany(like_res, { as: "like_res", foreignKey: "user_id"});
  order_.belongsTo(nguoi_dung, { as: "user", foreignKey: "user_id"});
  nguoi_dung.hasMany(order_, { as: "order_s", foreignKey: "user_id"});
  rate_res.belongsTo(nguoi_dung, { as: "user", foreignKey: "user_id"});
  nguoi_dung.hasMany(rate_res, { as: "rate_res", foreignKey: "user_id"});
  like_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(like_res, { as: "like_res", foreignKey: "res_id"});
  rate_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(rate_res, { as: "rate_res", foreignKey: "res_id"});

  return {
    food,
    food_type,
    like_res,
    nguoi_dung,
    order_,
    rate_res,
    restaurant,
    sub_food,
  };
}
