import { Sequelize, DataTypes } from "sequelize";
import db from "../config/config.js";
import Product from "./product.js";
import Transaction from "./transaction.js";

const TransactionDetail = db.define("transaction_details", {
  transaction_detail_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER,
});

TransactionDetail.belongsTo(Transaction, {
  foreignKey: "transaction_id",
  onDelete: "CASCADE",
});
TransactionDetail.belongsTo(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

export default TransactionDetail;
