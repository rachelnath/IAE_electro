import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Register } from "../pages/login/register";
import { ForgotPassword } from "../pages/login/forgot_password";
import { Dashboard } from "../pages/costumer/dashboard";
import { Product } from "../pages/costumer/product";
import { Store } from "../pages/costumer/store";
import { Checkout } from "../pages/costumer/checkout";
import { Error404 } from "../pages/error/Error404";
import { DashboardSaler } from "../pages/saler/dashboardSaler";
import { ReviewSaler } from "../pages/saler/reviewSaler";
import { FormProduct } from "../pages/saler/formProduct";
import { AfterPayment } from "../pages/components/afterPayment";
import { Transaction } from "../pages/costumer/transaction";
import { Nyoba } from "../pages/login/nyoba";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {/* Customer */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/store" element={<Store />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/afterpayment" element={<AfterPayment />} />

        {/* Saler */}
        <Route path="/saler/dashboard" element={<DashboardSaler />} />
        <Route path="/saler/review" element={<ReviewSaler />} />
        <Route path="/saler/form" element={<FormProduct />} />

        {/* Error */}
        <Route path="*" element={<Error404 />}></Route>

        <Route path="/kuncimotor" element={<Nyoba />} />
      </Routes>
    </BrowserRouter>
  );
};
