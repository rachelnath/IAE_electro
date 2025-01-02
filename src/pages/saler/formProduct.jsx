import { useEffect, useState } from "react";
import { SalerHeader } from "../components/salerHeader";
import { SalerNavbar } from "../components/salerNavbar";
import Dropdown from "react-dropdown";
import {
  AddProduct,
  editProduct,
  getProductById,
} from "../../controller/productController";
import { getCategory } from "../../controller/categoryController";
import { useLocation, useNavigate } from "react-router-dom";

export const FormProduct = () => {
  const [productName, setProductName] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productStock, setProductStock] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productImage, setProductImage] = useState();
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state;

  const refresh = () => {
    const resList = [];
    getCategory()
      .then((response) =>
        response.map((data) =>
          resList.push({
            value: data.category_id,
            label: data.category_name,
            className:
              "py-2 px-4 hover:bg-blue-500 hover:text-white cursor-pointer rounded",
          })
        )
      )
      .then(() => setCategory(resList));
  };

  useEffect(() => {
    refresh();
  }, []);

  if (stateData.type == "edit" && stateData.id != "") {
    useEffect(() => {
      getProductById(stateData.id).then((element) => {
        setProductName(element.product_name),
          setProductDescription(element.product_description),
          setProductPrice(element.product_price),
          setProductStock(element.product_stock),
          setProductCategory(element.category_id);
      });
    }, [stateData]);
  }

  console.log(productName);
  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* <!-- Desktop sidebar --> */}
        <SalerNavbar />
        <div className="flex flex-col flex-1">
          <SalerHeader />
          <main className="h-full pb-16 overflow-y-auto">
            <div className="container px-6 mx-auto grid">
              <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                {stateData.type == "edit" ? "Edit Product" : "Tambah Product"}
              </h2>

              {/* <!-- General elements --> */}
              <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <label className="block text-lg">
                  <span className="text-gray-700 dark:text-gray-400">
                    Nama Product
                  </span>
                  <input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Nama produck"
                    defaultValue={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  />
                </label>

                <label className="block mt-4 text-lg">
                  <span className="text-gray-700 dark:text-gray-400">
                    Deskripsi
                  </span>
                  <textarea
                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    rows="3"
                    placeholder="Tuliskan deskripsi dari product."
                    defaultValue={productDescription}
                    onChange={(e) => {
                      setProductDescription(e.target.value);
                    }}
                  ></textarea>
                </label>
                <label className="block text-lg">
                  <span className="text-gray-700 dark:text-gray-400">
                    Harga
                  </span>
                  <input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number"
                    placeholder="Harga produck"
                    defaultValue={productPrice}
                    onChange={(e) => {
                      setProductPrice(e.target.value);
                    }}
                  />
                </label>
                <label className="block text-lg">
                  <span className="text-gray-700 dark:text-gray-400">
                    Stock
                  </span>
                  <input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number"
                    placeholder="Stok produck"
                    defaultValue={productStock}
                    onChange={(e) => {
                      setProductStock(e.target.value);
                    }}
                  />
                </label>
                <label className="block text-lg">
                  <span className="text-gray-700 dark:text-gray-400">
                    Category
                  </span>
                  <Dropdown
                    options={category}
                    className="border border-black rounded-md shadow-md w-[200px]"
                    controlClassName="bg-white text-black border border-gray-300 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    menuClassName="absolute z-10 mt-1 w-[200px] bg-white border border-gray-300 rounded-md shadow-lg"
                    arrowClassName="text-gray-600"
                    value={productCategory}
                    onChange={(e) => {
                      setProductCategory(e.value);
                    }}
                  />
                </label>
                <label className="block text-lg">
                  <span className="text-gray-700 dark:text-gray-400">
                    Image
                  </span>
                  <input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="file"
                    placeholder="Jane Doe"
                    accept="image/*"
                    onChange={(e) => {
                      setProductImage(e.target.files[0]);
                    }}
                  />
                </label>
                <input
                  type="button"
                  placeholder="Jane Doe"
                  value={
                    stateData.type == "edit" ? "Edit Product" : "Tambah Product"
                  }
                  className="bg-[#7e3af2] text-white font-semibold py-2 px-4 text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={() => {
                    stateData.type == "edit"
                      ? editProduct(
                          stateData.id,
                          productName,
                          productDescription,
                          productPrice,
                          productStock,
                          productImage,
                          productCategory
                        ).then(() => {
                          navigate(-1);
                        })
                      : AddProduct(
                          productName,
                          productDescription,
                          productPrice,
                          productStock,
                          productImage,
                          productCategory
                        ).then(() => {
                          navigate(-1);
                        });
                  }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
