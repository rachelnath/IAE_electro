import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cleanCart } from "../../controller/cartController";
import { updateStatusTransaction } from "../../controller/transactionController";
import Cookies from "js-cookie";

const url = "http://localhost:3000";

export const AfterPayment = () => {
  const orderId = Cookies.get("orderId");
  console.log(orderId);

  const navigate = useNavigate();
  useEffect(() => {
    cleanCart().then(() => {
      updateStatusTransaction(orderId, "Success").then(() => {
        document.cookie =
          "orderId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/dashboard");
      });
    });
  }, []);
};
