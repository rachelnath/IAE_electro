import { Header } from "../components/header";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { generatePaymentUrl } from "../../controller/paymentController";
import { useEffect, useState } from "react";
import { getCart } from "../../controller/cartController";
import Cookies from "js-cookie";

export const Checkout = () => {
  const [cartItem, setCartItem] = useState([]);
  const [address, setAdress] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [zipCode, setZipCode] = useState();
  const [telPhone, setTelphone] = useState();
  const [notes, setNotes] = useState();

  const accountId = Cookies.get("accountId");

  const refreshData = () => {
    getCart()
      .then((element) =>
        element.filter((data) => data.account_id === accountId)
      )
      .then((response) => {
        setCartItem(response);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  let requestItem = [];
  let grossAmount = 0;

  cartItem.forEach((element) => {
    grossAmount += element.product.product_price * element.quantity;
    requestItem.push({
      product_id: element.product_id,
      quantity: element.quantity,
    });
  });

  return (
    <>
      <Header />
      <Navbar />

      {/* <!-- SECTION --> */}
      <div class="section">
        {/* <!-- container --> */}
        <div class="container">
          {/* <!-- row --> */}
          <div class="row">
            <div class="col-md-7">
              {/* <!-- Billing Details --> */}
              <div class="billing-details">
                <div class="section-title">
                  <h3 class="title">Billing address</h3>
                </div>
                <div class="form-group">
                  <input
                    required
                    class="input"
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={(e) => {
                      setAdress(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="input"
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="input"
                    type="text"
                    name="country"
                    placeholder="Country"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="input"
                    type="text"
                    name="zip-code"
                    placeholder="ZIP Code"
                    onChange={(e) => {
                      setZipCode(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="input"
                    type="tel"
                    name="tel"
                    placeholder="Telephone"
                    onChange={(e) => {
                      setTelphone(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* <!-- /Billing Details --> */}

              {/* <!-- Order notes --> */}
              <div class="order-notes">
                <textarea
                  class="input"
                  placeholder="Order Notes"
                  onChange={(e) => {
                    setNotes(e.target.value);
                  }}
                ></textarea>
              </div>
              {/* <!-- /Order notes --> */}
            </div>

            {/* <!-- Order Details --> */}
            <div class="col-md-5 order-details">
              <div class="section-title text-center">
                <h3 class="title">Your Order</h3>
              </div>
              <div class="order-summary">
                <div class="order-col">
                  <div>
                    <strong>PRODUCT</strong>
                  </div>
                  <div>
                    <strong>TOTAL</strong>
                  </div>
                </div>
                <div class="order-products">
                  {cartItem.map((element) => {
                    return (
                      <div class="order-col">
                        <div>
                          {element.quantity}x {element.product.product_name}
                        </div>
                        <div>
                          Rp{" "}
                          {Intl.NumberFormat("id-ID").format(
                            element.quantity * element.product.product_price
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div class="order-col">
                  <div>
                    <strong>TOTAL</strong>
                  </div>
                  <div>
                    <strong class="order-total">
                      Rp {Intl.NumberFormat("id-ID").format(grossAmount)}
                    </strong>
                  </div>
                </div>
              </div>
              {/* doku send data */}
              <a
                onClick={() => {
                  generatePaymentUrl(requestItem, {
                    address: address,
                    city: city,
                    country: country,
                    zipCode: zipCode,
                    telphone: telPhone,
                    notes: notes,
                  });
                }}
                class="primary-btn order-submit cursor-pointer"
              >
                Order
              </a>
            </div>
            {/* <!-- /Order Details --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /SECTION --> */}

      <Footer />
    </>
  );
};
