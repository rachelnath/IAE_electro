import { Sequelize, DataTypes } from "sequelize";
import db from "../config/config.js";
import Account from "./account.js";

const Transaction = db.define("transactions", {
  transaction_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Process",
  },
  gross_amount: DataTypes.INTEGER,
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  country: DataTypes.STRING,
  zipCode: DataTypes.STRING,
  telphone: DataTypes.STRING,
  notes: DataTypes.TEXT,
});

Transaction.belongsTo(Account, {
  foreignKey: "account_id",
  onDelete: "CASCADE",
});

export default Transaction;
