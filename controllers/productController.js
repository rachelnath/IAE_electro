import multer from "multer";
import Account from "../models/account.js";
import Category from "../models/category.js";
import Product from "../models/product.js";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

export const ShowProduct = async (req, res) => {
  try {
    const response = await Product.findAll({
      include: [{ model: Category, attributes: ["category_name"] }],
    });
    res.status(200).json(response);
  } catch (error) {
    res.json({ msg: Error });
  }
};

export const ShowProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findOne({
      where: { product_id: id },
      include: [{ model: Category, attributes: ["category_name"] }],
    });
    res.status(200).json(response);
  } catch (error) {
    res.json({ msg: Error });
  }
};

export const AddProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productStock,
    categoryId,
    accountId,
  } = req.body;
  const file = req.file;
  try {
    const isCustomer = await Account.findOne({
      where: { account_id: accountId },
    }).then((element) => element.type == "saler");
    if (isCustomer) {
      await Product.create({
        product_name: productName,
        product_description: productDescription,
        product_price: productPrice,
        product_stock: productStock,
        product_image: file.filename,
        category_id: categoryId,
        account_id: accountId,
      });
      res
        .status(200)
        .json({ status: "Success", message: "Data berhasil dikirim" });
    } else {
      res.status(401).json({
        status: "Error",
        message: "Hanya akun saler yang diperbolehkan melakukan action ini",
      });
    }
  } catch (error) {
    res.json({ status: "Error", message: Error });
  }
};

export const multerConfig = async (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/post");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `PR-${nanoid(4)}-${nanoid(8)}` + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
  });

  upload.single("productImage")(req, res, (err) => {
    if (err) {
      return res.status(400).send("Error uploading file: " + err.message);
    }
    next();
  });
};

export const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    productPrice,
    productStock,
    categoryId,
  } = req.body;
  const file = req.file;
  const responseData = {
    product_name: productName,
    product_description: productDescription,
    product_price: productPrice,
    product_stock: productStock,
    category_id: categoryId,
  };
  try {
    const isExist = await Product.findOne({ where: { product_id: id } });
    if (isExist) {
      if (file) {
        responseData["product_image"] = file.filename;
        fs.unlink(`public/post/${isExist.product_image}`, (err) => {
          if (err) {
            console.error(`Error deleting file: ${err}`);
            return;
          }
          console.log("File deleted successfully");
        });
      }
      await Product.update(responseData, {
        where: { product_id: id },
      });
      res.status(200).json({ msg: "Data berhasil diupdate" });
    } else {
      res.json({ msg: "data tidak tersedia" });
    }
  } catch (error) {
    res.json({ msg: Error });
  }
};

export const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Product.findOne({ where: { product_id: id } });
    if (isExist) {
      fs.unlink(`public/post/${isExist.product_image}`, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return;
        }
        console.log("File deleted successfully");
      });
      await Product.destroy({
        where: { product_id: id },
      });
      res.status(200).json({ msg: "Data berhasil dihapus" });
    } else {
      res.json({ msg: "data tidak tersedia" });
    }
  } catch (error) {
    res.json({ msg: Error });
  }
};
