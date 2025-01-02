import { Sequelize, DataTypes } from "sequelize";
import db from "../config/config.js";

const Account = db.define("account", {
  account_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: DataTypes.STRING(50),
  email: DataTypes.STRING(40),
  password: DataTypes.STRING(20),
  token: DataTypes.STRING,
  type: DataTypes.ENUM("saler", "customer"),
});

export default Account;

db.sync();
