import { Sequelize, DataTypes } from "sequelize";
import db from "../config/config.js";
import Product from "./product.js";
import Account from "./account.js";

const Cart = db.define(
  "carts",
  {
    cart_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

Cart.belongsTo(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});
Cart.belongsTo(Account, {
  foreignKey: "account_id",
  onDelete: "CASCADE",
});

export default Cart;

db.sync();
