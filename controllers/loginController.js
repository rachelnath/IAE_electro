import Account from "../models/account.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const Login = async (req, res) => {
  const { loginData, password } = req.body;
  try {
    let isExist = await Account.findOne({
      where: { username: loginData },
    });
    if (!isExist) {
      isExist = await Account.findOne({
        where: { email: loginData },
      });
    }

    if (isExist) {
      let userData = isExist;
      const validation = bcrpyt.compare(password, userData.password);
      if (!validation) {
        res.json({ msg: "Wrong Password" });
      } else {
        const accessToken = jwt.sign(
          {
            accountId: userData.account_id,
            username: userData.username,
            email: userData.email,
          },
          process.env.SECRET_KEY,
          { expiresIn: "60h" }
        );

        await Account.update(
          {
            token: accessToken,
          },
          {
            where: {
              [Sequelize.Op.or]: [
                { username: loginData },
                { email: loginData },
              ],
            },
          }
        );
        res.json({
          token: accessToken,
          accountId: userData.account_id,
          type: userData.type,
        });
      }
    } else {
      res
        .status(401)
        .json({ status: "Error", message: "Email atau username salah" });
    }
  } catch (error) {
    res.json({ msg: Error });
  }
};

const hashPassword = (password) => {
  const saltRound = 5;
  return bcrpyt.hashSync(password, saltRound);
};

export const ForgetPassword = async (req, res) => {
  const { loginData, password } = req.body;

  try {
    await Account.update(
      {
        password: hashPassword(password),
      },
      {
        where: {
          [Sequelize.Op.or]: [{ username: loginData }, { email: loginData }],
        },
      }
    );

    res
      .status(200)
      .json({ status: "Success", message: "Berhasil update password" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};
