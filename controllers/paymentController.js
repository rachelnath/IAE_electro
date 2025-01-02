import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Transaction from "../models/transaction.js";
import TransactionDetail from "../models/transaction_details.js";

dotenv.config();

const requestTarget = "/checkout/v1/payment";

export const payment = async (req, res) => {
  const { item, accountId, orderDetail } = req.body;
  const requestId = `EC-${nanoid(4)}-${nanoid(8)}`;
  const requestTimestamp = new Date().toISOString().slice(0, 19) + "Z";

  let requestItem = {
    order: {
      amount: 0, //penting
      invoice_number: requestId, //penting
      line_item: [], //penting
      callback_url: "http://localhost:5173/afterpayment",
    },
    payment: {
      payment_due_date: 60, //penting
    },
  };

  for (let i = 0; i < item.length; i++) {
    const response = await Product.findOne({
      where: { product_id: item[i].product_id },
      include: [{ model: Category, attributes: ["category_name"] }],
    });
    requestItem.order.line_item.push({
      id: item[i].product_id,
      name: response.dataValues.product_name,
      quantity: item[i].quantity,
      price: response.dataValues.product_price,
      category: response.dataValues.category.category_name,
    });
    requestItem.order.amount +=
      response.dataValues.product_price * item[i].quantity;
  }

  try {
    await Transaction.create({
      order_id: requestId,
      gross_amount: requestItem.order.amount,
      account_id: accountId,
      address: orderDetail.address,
      city: orderDetail.city,
      country: orderDetail.country,
      zipCode: orderDetail.zipCode,
      telphone: orderDetail.telphone,
      notes: orderDetail.notes,
    }).then(async (data) => {
      item.forEach(async (element) => {
        await TransactionDetail.create({
          transaction_id: data.transaction_id,
          quantity: element.quantity,
          product_id: element.product_id,
        });
      });
    });
  } catch (error) {
    return res.json({
      status: "Error",
      message: "Gagal mengirim data ke transaksi",
    });
  }

  const generateDigest = (item) => {
    const data = JSON.stringify(item);
    const itemHash = crypto.createHash("sha256").update(data, "utf-8").digest();
    const buffer = Buffer.from(itemHash);
    return buffer.toString("base64");
  };

  const digest = generateDigest(requestItem);
  const generateSignature = () => {
    const componentSignature = `Client-Id:${process.env.DOKU_CLIENT_ID}\nRequest-Id:${requestId}\nRequest-Timestamp:${requestTimestamp}\nRequest-Target:${requestTarget}\nDigest:${digest}`;
    const hmac = crypto
      .createHmac("sha256", process.env.DOKU_SECRET_KEY)
      .update(componentSignature.toString())
      .digest();
    const signature = Buffer.from(hmac).toString("base64");
    return `HMACSHA256=${signature}`;
  };

  const signature = generateSignature();
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.DOKU_APP_URL + requestTarget,
    headers: {
      "Client-Id": process.env.DOKU_CLIENT_ID,
      "Request-Id": requestId,
      "Request-Timestamp": requestTimestamp,
      Signature: signature,
      "Content-Type": "application/json",
    },
    data: requestItem,
  };

  axios
    .request(config)
    .then((response) => {
      return res.json({
        message: response.data.message[0],
        token: response.data.response.payment.token_id,
        redirect_url: response.data.response.payment.url,
        order_id: requestId,
      });
    })
    .catch((error) => {
      res.json(error);
    });
};
