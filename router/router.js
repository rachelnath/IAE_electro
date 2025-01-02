import express from "express";
import { ShowCategory } from "../controllers/categoryController.js";
import {
  AddProduct,
  DeleteProduct,
  multerConfig,
  ShowProduct,
  ShowProductById,
  UpdateProduct,
} from "../controllers/productController.js";
import {
  AddCart,
  cleanCart,
  DeleteCart,
  ShowCart,
  ShowCartById,
  UpdateCart,
} from "../controllers/cartController.js";
import {
  AddReview,
  DeleteReview,
  ResponseReview,
  ShowReview,
  ShowReviewById,
  UpdateReview,
} from "../controllers/reviewController.js";
import {
  AddAccount,
  ShowAccountById,
} from "../controllers/accountController.js";
import { ForgetPassword, Login } from "../controllers/loginController.js";
import {
  ShowTransaction,
  UpdateStatusTransaction,
} from "../controllers/transactionController.js";
import { payment } from "../controllers/paymentController.js";
import { tokenAuth } from "../middleware/tokenAuth.js";

const router = express.Router();

//category
router.get("/category", tokenAuth, ShowCategory);

//Product
router.get("/product", tokenAuth, ShowProduct);
router.get("/product/:id", tokenAuth, ShowProductById);
router.post("/product", tokenAuth, multerConfig, AddProduct);
router.patch("/product/:id", tokenAuth, multerConfig, UpdateProduct);
router.delete("/product/:id", tokenAuth, DeleteProduct);

//Cart
router.get("/cart", tokenAuth, ShowCart);
router.get("/cart/:id", tokenAuth, ShowCartById);
router.post("/cart", tokenAuth, AddCart);
router.patch("/cart/:id", tokenAuth, UpdateCart);
router.delete("/cart/:id", tokenAuth, DeleteCart);
router.delete("/clean", tokenAuth, cleanCart);

//Review
router.get("/review", tokenAuth, ShowReview);
router.get("/review/:id", tokenAuth, ShowReviewById);
router.post("/review", tokenAuth, AddReview);
router.patch("/review/:id", tokenAuth, UpdateReview);
router.delete("/review/:id", tokenAuth, DeleteReview);
router.patch("/review/response/:id", tokenAuth, ResponseReview);

//Account
router.get("/account/:id", tokenAuth, ShowAccountById);
router.post("/account/", AddAccount);
router.patch("/forgetPassword", ForgetPassword);

//Login
router.post("/login", Login);

//Transaction
router.get("/transaction", tokenAuth, ShowTransaction);
router.patch("/transaction/status", tokenAuth, UpdateStatusTransaction);
// Payment
router.post("/payment", tokenAuth, payment);

export default router;
