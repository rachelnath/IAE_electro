import { useEffect, useState } from "react";
import "../../assets/css/tailwind.output.css";
import { SalerHeader } from "../components/salerHeader";
import { SalerNavbar } from "../components/salerNavbar";
import Cookies from "js-cookie";
import {
  getReview,
  removeResponse,
  sendResponse,
} from "../../controller/reviewController";
import { getProduct } from "../../controller/productController";
import { Modal } from "../components/modal";

export const ReviewSaler = () => {
  const [review, setReview] = useState([]);
  const [product, setProduct] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [reviewResponse, setReviewResponse] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const userCredential = Cookies.get();

  const refresh = () => {
    getProduct()
      .then((response) =>
        response.filter((data) => data.account_id == userCredential.accountId)
      )
      .then((filter) => setProduct(filter));
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const filterList = [];
    const productFilter = [];
    getReview()
      .then((response) => {
        response.filter((data) => {
          product.map((element) => {
            if (element.product_id == data.product_id) {
              filterList.push(data);
              productFilter.push(element);
            }
          });
        });
      })
      .then(() => {
        setReview(filterList);
        setProductFilter(productFilter);
      });
  }, [product]);
  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <SalerNavbar page={"review"} />
        <div className="flex flex-col flex-1 w-full">
          <SalerHeader />
          <main className="h-full pb-16 overflow-y-auto">
            <div className="container grid px-6 mx-auto">
              <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Product
              </h2>

              {/* <!-- With actions --> */}
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-lg font-bold center tracking-wide uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3 text-center">Produk</th>
                        <th className="px-4 py-3 text-center">Review</th>
                        <th className="px-4 py-3 text-center">Skor</th>
                        <th className="px-4 py-3 text-center">Response</th>
                        <th className="px-4 py-3 text-center">Send</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {review.map((element, index) => {
                        return (
                          <tr
                            className="dark:text-gray-400"
                            style={{ fontSize: 15, fontWeight: 600 }}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                {/* <!-- Avatar with inset shadow --> */}
                                <div className="relative mr-3 rounded-full md:block w-[8vh]">
                                  <img
                                    className="object-cover w-full h-full rounded-full"
                                    src={`http://localhost:3000/image/${productFilter[index].product_image}`}
                                    alt=""
                                    loading="lazy"
                                  />
                                  <div
                                    className="absolute inset-0 rounded-full shadow-inner"
                                    aria-hidden="true"
                                  ></div>
                                </div>
                                <div>
                                  <p className="font-semibold text-xl">
                                    {productFilter[index].product_name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-lg lg max-w-[200px] overflow-hidden text-wrap text-ellipsis">
                              {element.review_text}
                            </td>
                            <td className="px-4 py-3 text-xl text-center">
                              {element.review_skor}
                            </td>

                            {/* <td className="px-4 py-3 text-sm">
                              <textarea
                                className="border border-gray-300 rounded-lg text-lg p-2 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                style={{ height: "auto" }}
                                placeholder="Type your message here..."
                                onChange={(e) => {
                                  setReviewResponse(e.target.value);
                                }}
                              ></textarea>
                            </td> */}

                            <td className="px-4 py-3 text-lg lg max-w-[200px] overflow-hidden text-wrap text-ellipsis">
                              {element.review_response}
                            </td>

                            <td className="px-4 py-3 text-center">
                              {element.review_response ? (
                                <>
                                  <button
                                    onClick={() => {
                                      setOpenModal("edit");
                                      setReviewId(element.review_id);
                                      setReviewResponse(
                                        element.review_response
                                      );
                                    }}
                                    className="bg-[#7e3af2] text-xl text-white font-normal py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
                                  >
                                    <i className="fa fa-edit"></i>
                                  </button>
                                  <button
                                    onClick={() => {
                                      removeResponse(element.review_id).then(
                                        () => refresh()
                                      );
                                    }}
                                    className="bg-[#7e3af2] text-xl ml-2 text-white font-normal py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                  <Modal
                                    title={"Edit Response"}
                                    isOpen={openModal == "edit"}
                                    onClose={() => setOpenModal("")}
                                    content={
                                      <>
                                        <div className="mb-4">
                                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                            Edit Response
                                          </h3>
                                          <textarea
                                            value={reviewResponse}
                                            onChange={(e) => {
                                              setReviewResponse(e.target.value);
                                            }}
                                            className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Tulis response Anda di sini..."
                                          />
                                        </div>
                                        <button
                                          onClick={() => {
                                            sendResponse(
                                              reviewId,
                                              reviewResponse
                                            ).then(() => {
                                              setOpenModal("");
                                              refresh();
                                            });
                                          }}
                                          className=" px-4 py-2 bg-blue-500 text-white font-normal rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                                        >
                                          Kirim Response
                                        </button>
                                      </>
                                    }
                                  ></Modal>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      setOpenModal("add");
                                      setReviewId(element.review_id);
                                    }}
                                    className="bg-[#7e3af2] text-xl text-white font-normal py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
                                  >
                                    <i className="fa fa-add"></i>
                                  </button>
                                  <Modal
                                    title={"Tambah Response"}
                                    isOpen={openModal == "add"}
                                    onClose={() => setOpenModal("")}
                                    content={
                                      <>
                                        <div className="mb-4">
                                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                            Tambah Response
                                          </h3>
                                          <textarea
                                            onChange={(e) => {
                                              setReviewResponse(e.target.value);
                                            }}
                                            className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Tulis response Anda di sini..."
                                          />
                                        </div>
                                        <button
                                          onClick={() => {
                                            sendResponse(
                                              reviewId,
                                              reviewResponse
                                            ).then(() => {
                                              setOpenModal("");
                                              refresh();
                                            });
                                          }}
                                          className=" px-4 py-2 bg-blue-500 text-white font-normal rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                                        >
                                          Kirim Response
                                        </button>
                                      </>
                                    }
                                  ></Modal>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
