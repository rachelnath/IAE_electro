import Account from "../models/account.js";
import bcrypt from "bcrypt";

const hashPassword = (password) => {
  const saltRound = 5;
  return bcrypt.hashSync(password, saltRound);
};

export const ShowAccountById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Account.findOne({ where: { account_id: id } });
    res.status(200).json(response);
  } catch (error) {
    res.json({ msg: Error });
  }
};

export const AddAccount = async (req, res) => {
  const { username, email, password, type } = req.body;
  try {
    const request = {
      username: username,
      email: email,
      password: hashPassword(password),
      type: type,
    };
    await Account.create(request);
    res.status(200).json({ msg: "Data berhasil dikirim" });
  } catch (error) {
    res.json({ msg: Error });
  }
};
