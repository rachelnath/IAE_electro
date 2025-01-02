import { Header } from "../components/header";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Modal } from "../components/modal";
import { useEffect, useState } from "react";
import { getTransaction } from "../../controller/transactionController";
import Cookies from "js-cookie";
import { getProductById } from "../../controller/productController";

export const Transaction = () => {
  const accountId = Cookies.get("accountId");
  const [detailOpen, setDetailOpen] = useState(false);
  const [transaction, setTransaction] = useState([]);

  const refresh = () => {
    getTransaction()
      .then((response) =>
        response.response.filter((element) =>
          element.transaction.account_id.includes(accountId)
        )
      )
      .then((filter) => setTransaction(filter));
  };

  const refreshProduct = () => {
    const listProduct = transaction;
    transaction.map((response, index) =>
      response.details.map((data, num) =>
        getProductById(data.product_id).then(
          (element) => (listProduct[index].details[num]["product"] = element)
        )
      )
    );
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    refreshProduct();
  }, [transaction]);

  return (
    <>
      <Header />
      <Navbar />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Daftar Transaksi</h2>

        {/* Transaction List */}
        {transaction.map((element, index) => {
          return (
            <div
              className=" mx-auto my-4 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex justify-between"
              key={index}
            >
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">
                  Order id : {element.transaction.order_id}
                </h2>
                <p className="text-gray-500 mb-4">
                  {
                    new Date(element.transaction.updatedAt)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
                <p
                  className="inline-block py-2 text-[#d10024] font-semibold cursor-pointer"
                  onClick={() => setDetailOpen(true)}
                >
                  Lihat detail
                </p>
              </div>
              <div className="p-4">
                <h2
                  className={`flex justify-self-end text-xl font-semibold mb-2  w-min px-4 py-1 rounded ${
                    element.transaction.status.toLowerCase() == "failed"
                      ? "text-red-600 bg-red-300"
                      : element.transaction.status.toLowerCase() == "process"
                      ? "text-yellow-600 bg-yellow-200"
                      : "text-green-600 bg-green-300"
                  }`}
                >
                  {element.transaction.status}
                </h2>
              </div>
              <Modal
                isOpen={detailOpen}
                onClose={() => setDetailOpen(false)}
                content={
                  <>
                    <div className="flex justify-between p-4 rounded-lg border-b-2 border-dashed">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-700">
                          No Pesanan
                        </h2>
                        <h2 className="text-xl font-semibold text-gray-700">
                          Tanggal Pesanan
                        </h2>
                      </div>
                      <div className="text-right">
                        <h2 className="text-xl font-bold text-gray-700">
                          {element.transaction.order_id}
                        </h2>
                        <h2 className="text-xl font-normal text-gray-400">
                          {
                            new Date(element.transaction.updatedAt)
                              .toISOString()
                              .split("T")[0]
                          }
                        </h2>
                      </div>
                    </div>
                    <div className="p-4 border-b-2 border-dashed">
                      <h1>Detail pesanan : </h1>
                      <div className="border-2 border-gray-300 mt-3 rounded-xl">
                        {element.details.map((data, index) => {
                          return (
                            <div
                              className={`flex items-center justify-between p-4 ${
                                index <= 3 ? "border-bottom" : ""
                              }`}
                              key={index}
                            >
                              <img
                                src={`http://localhost:3000/image/${data.product?.product_image}`}
                                alt="Product"
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1 mx-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                  {data.product?.product_name}
                                </h2>
                                <h4 className="text-lg text-gray-600">
                                  {data.quantity} x Rp{" "}
                                  {Intl.NumberFormat("id-ID").format(
                                    data.product?.product_price
                                  )}
                                </h4>
                              </div>
                              <div className="text-xl font-bold text-gray-700">
                                Rp{" "}
                                {Intl.NumberFormat("id-ID").format(
                                  data.quantity * data.product?.product_price
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between p-4 bg-white rounded-lg">
                      <div className="text-2xl font-semibold text-gray-800">
                        Total Pesanan
                      </div>
                      <div className="text-2xl font-bold text-gray-700">
                        Rp{" "}
                        {Intl.NumberFormat("id-ID").format(
                          element.transaction.gross_amount
                        )}
                      </div>
                    </div>
                  </>
                }
              ></Modal>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};
