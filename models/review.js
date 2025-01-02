import { Sequelize, DataTypes } from "sequelize";
import db from "../config/config.js";
import Product from "./product.js";
import Account from "./account.js";

const Review = db.define(
  "reviews",
  {
    review_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    review_text: DataTypes.TEXT,
    review_skor: DataTypes.DOUBLE,
    review_response: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

Review.belongsTo(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});
Review.belongsTo(Account, {
  foreignKey: "account_id",
  onDelete: "CASCADE",
});

export default Review;

db.sync();
