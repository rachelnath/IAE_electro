import { DataTypes, Sequelize } from "sequelize";
import db from "../config/config.js";
import Category from "./category.js";
import Account from "./account.js";

const Product = db.define(
  "products",
  {
    product_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    product_name: DataTypes.STRING(50),
    product_description: DataTypes.STRING,
    product_price: DataTypes.INTEGER(20),
    product_stock: DataTypes.INTEGER(9),
    product_image: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
Product.belongsTo(Account, {
  foreignKey: "account_id",
  onDelete: "CASCADE",
});

export default Product;

db.sync();
