import { Navbar } from "../components/navbar";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import { getProduct } from "../../controller/productController";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addCart } from "../../controller/cartController";
import { getCategory } from "../../controller/categoryController";

export const Store = () => {
  const [product, setProduct] = useState([]);
  const [refreshCart, setRefreshCart] = useState(false);
  const [category, setCategory] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const searchCategory = searchParams.get("category") || "";

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (searchText) => {
    const params = new URLSearchParams(location.search);
    params.set("category", searchText);

    navigate({
      pathname: "/store",
      search: params.toString(),
    });
  };

  useEffect(() => {
    refresh();
  }, [search, searchCategory]);

  const refresh = () => {
    getProduct()
      .then((response) =>
        response.filter(
          (element) =>
            element.product_name.toLowerCase().includes(search.toLowerCase()) &&
            element.category_id.includes(searchCategory)
        )
      )
      .then((filter) => setProduct(filter));
    getCategory().then((response) => setCategory(response));
  };

  return (
    <>
      <Header refreshChart={refreshCart} />
      <Navbar />

      {/* <!-- SECTION --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            {/* <!-- ASIDE --> */}
            <div id="aside" className="col-md-3">
              {/* <!-- aside Widget --> */}
              <div className="aside">
                <h3 className="aside-title">Categories</h3>
                <div className="checkbox-filter">
                  <div className="input-checkbox">
                    <input
                      type="radio"
                      name="category"
                      value="allCategory"
                      id="allCategory"
                      onChange={() => {
                        navigate({
                          pathname: "/store",
                          search: "?category=",
                        });
                        refresh();
                      }}
                    />
                    <label htmlFor={"allCategory"}>
                      <span></span>
                      All Categories
                      <small> ({product.length})</small>
                    </label>
                  </div>
                  {category.map((element, index) => {
                    return (
                      <div className="input-checkbox" key={index}>
                        <input
                          type="radio"
                          name="category"
                          value={element.category_id}
                          id={element.category_id}
                          onChange={(e) => {
                            handleNavigate(e.target.value);
                            refresh();
                          }}
                        />
                        <label htmlFor={element.category_id}>
                          <span></span>
                          {element.category_name}
                          <small>
                            {" "}
                            (
                            {
                              product.filter(
                                (data) =>
                                  data.category_id === element.category_id
                              ).length
                            }
                            )
                          </small>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <!-- /aside Widget --> */}
            </div>
            {/* <!-- /ASIDE --> */}

            {/* <!-- STORE --> */}
            <div id="store" className="col-md-9">
              {/* <!-- store products --> */}
              <div className="row">
                {product.map((element, index) => {
                  return (
                    <div className="col-md-4 col-xs-6" key={index}>
                      <div className="product">
                        <div className="product-img h-[280px] grid items-center p-3">
                          <img
                            src={`http://localhost:3000/image/${element.product_image}`}
                            alt=""
                          />
                        </div>
                        <div className="product-body">
                          <p className="product-category">
                            {element.category.category_name}
                          </p>
                          <h3 className="product-name">
                            <Link
                              to={`/product/${element.product_id}`}
                              onClick={() => {
                                window.scrollTo({ top: 0 });
                              }}
                            >
                              {element.product_name}
                            </Link>
                          </h3>
                          <h4 className="product-price">
                            Rp{" "}
                            {Intl.NumberFormat("id-ID").format(
                              element.product_price
                            )}
                          </h4>
                          <div className="product-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                        </div>
                        <div className="add-to-cart">
                          <button
                            className="add-to-cart-btn"
                            onClick={() => {
                              addCart(element.product_id, 1).then(() => {
                                setRefreshCart(!refreshCart);
                              });
                            }}
                          >
                            <i className="fa fa-shopping-cart"></i> add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <!-- /store products --> */}
            </div>
            {/* <!-- /STORE --> */}
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
