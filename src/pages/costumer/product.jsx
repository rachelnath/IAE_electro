import "../../assets/css/index.css";
import "../../assets/css/product.css";
import { Header } from "../components/header";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import "../../assets/fonts/fontawesome-webfont.ttf";
import "../../assets/fonts/FontAwesome.otf";
import "../../assets/fonts/slick.ttf";
import { Link, useParams } from "react-router-dom";
import { getProduct, getProductById } from "../../controller/productController";
import { useEffect, useState } from "react";
import { addCart } from "../../controller/cartController";
import { addReview, getReview } from "../../controller/reviewController";

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productList, setProductList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [refreshCart, setRefreshCart] = useState(false);
  const [review, setReview] = useState([]);
  const [tabContent, setTabContent] = useState(true);
  const [totalReview, setTotalReview] = useState(0);

  // Review data
  const [reviewText, setReviewText] = useState();
  const [reviewScore, setReviewScore] = useState();

  const refresh = () => {
    getProductById(id)
      .then((response) => setProduct(response))
      .then(() => {
        getReview().then((response) => {
          setReview(response.filter((element) => element.product_id == id));
        });
      });
  };

  useEffect(() => {
    refresh();
  }, [id]);

  useEffect(() => {
    getProduct()
      .then((response) =>
        response.filter(
          (element) =>
            element.category_id.includes(product.category_id) &&
            element.product_id != product.product_id
        )
      )
      .then((filter) => setProductList(filter));
  }, [product]);

  useEffect(() => {
    let total = 0;
    review.map((element) => (total += element.review_skor));
    setTotalReview(total);
  }, [review]);

  return (
    <>
      <Header refreshChart={refreshCart} />
      <Navbar />

      {/* <!-- SECTION --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row justify-center">
            {/* <!-- Product main img --> */}
            <img
              className="w-[400px] h-min flex"
              src={`http://localhost:3000/image/${product.product_image}`}
              alt=""
            />
            {/* <!-- /Product main img --> */}

            {/* <!-- Product details --> */}
            <div className="col-md-5">
              <div className="product-details">
                <h2 className="product-name">{product.product_name}</h2>
                <div className="flex">
                  <div className="product-rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                  </div>
                  <p className="review-link">{review.length} Review(s)</p>
                </div>
                <div>
                  <h3 className="product-price">
                    Rp{" "}
                    {Intl.NumberFormat("id-ID").format(product.product_price)}
                  </h3>
                  <span className="product-available">
                    {product.product_stock > 0
                      ? `${
                          product.product_stock > 999
                            ? "999+"
                            : product.product_stock
                        } In Stock`
                      : "Out of Stock"}
                  </span>
                </div>
                <p>{product.product_description}</p>

                <div className="add-to-cart mt-5">
                  <div className="qty-label">
                    Qty
                    <div className="input-number mx-2">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(value) => {
                          setQuantity(value.target.value);
                        }}
                      />
                      <span
                        className="qty-up"
                        onClick={() => {
                          if (quantity < product.product_stock) {
                            setQuantity(quantity + 1);
                          }
                        }}
                      >
                        +
                      </span>
                      <span
                        className="qty-down"
                        onClick={() => {
                          if (quantity > 0) {
                            setQuantity(quantity - 1);
                          }
                        }}
                      >
                        -
                      </span>
                    </div>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      if (quantity > 0) {
                        addCart(product.product_id, quantity).then(() => {
                          setRefreshCart(!refreshCart);
                        });
                      }
                    }}
                  >
                    <i className="fa fa-shopping-cart"></i> add to cart
                  </button>
                </div>

                <ul className="product-links">
                  <li>Category:</li>
                  <li>
                    <a href="#">{product.category?.category_name}</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- /Product details --> */}

            {/* <!-- Product tab --> */}
            <div className="col-md-12">
              <div id="product-tab">
                {/* <!-- product tab nav --> */}
                <ul className="tab-nav">
                  <li className={tabContent ? "active" : ""}>
                    <a
                      data-toggle="tab"
                      className="cursor-pointer"
                      onClick={() => {
                        setTabContent(true);
                      }}
                    >
                      Description
                    </a>
                  </li>
                  <li className={tabContent ? "" : "active"}>
                    <a
                      data-toggle="tab"
                      href="#tab2"
                      onClick={() => {
                        setTabContent(false);
                      }}
                    >
                      Reviews ({review.length})
                    </a>
                  </li>
                </ul>
                {/* <!-- /product tab nav --> */}

                {/* <!-- product tab content --> */}
                <div className="tab-content">
                  {tabContent ? (
                    <div
                      id="tab1"
                      className="fade in active active block h-auto opacity-1 overflow-hidden pb-[15px] mb-[-15px]"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <p>{product.product_description}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      id="tab3"
                      className="fade in fade in active active block h-auto opacity-1 overflow-hidden pb-[15px] mb-[-15px]"
                    >
                      <div className="row">
                        {/* <!-- Rating --> */}
                        <div className="col-md-3">
                          <div id="rating">
                            <div className="rating-avg">
                              <span className="">
                                {parseFloat(
                                  totalReview / review.length
                                ).toFixed(1)}
                              </span>
                              <div className="rating-stars">
                                <i
                                  className={
                                    totalReview / review.length >= 1
                                      ? "fa fa-star"
                                      : "fa fa-star-o"
                                  }
                                ></i>
                                <i
                                  className={
                                    totalReview / review.length >= 2
                                      ? "fa fa-star"
                                      : "fa fa-star-o"
                                  }
                                ></i>
                                <i
                                  className={
                                    totalReview / review.length >= 3
                                      ? "fa fa-star"
                                      : "fa fa-star-o"
                                  }
                                ></i>
                                <i
                                  className={
                                    totalReview / review.length >= 4
                                      ? "fa fa-star"
                                      : "fa fa-star-o"
                                  }
                                ></i>
                                <i
                                  className={
                                    totalReview / review.length >= 5
                                      ? "fa fa-star"
                                      : "fa fa-star-o"
                                  }
                                ></i>
                              </div>
                            </div>
                            <ul className="rating">
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                </div>
                                <div className="rating-progress">
                                  <div
                                    style={{
                                      width: `${parseInt(
                                        (review.filter(
                                          (element) => element.review_skor == 5
                                        ).length /
                                          review.length) *
                                          100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="sum">5</span>
                              </li>
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-o"></i>
                                </div>
                                <div className="rating-progress">
                                  <div
                                    style={{
                                      width: `${parseInt(
                                        (review.filter(
                                          (element) => element.review_skor == 4
                                        ).length /
                                          review.length) *
                                          100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="sum">4</span>
                              </li>
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                </div>
                                <div className="rating-progress">
                                  <div
                                    style={{
                                      width: `${parseInt(
                                        (review.filter(
                                          (element) => element.review_skor == 3
                                        ).length /
                                          review.length) *
                                          100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="sum">3</span>
                              </li>
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                </div>
                                <div className="rating-progress">
                                  <div
                                    style={{
                                      width: `${parseInt(
                                        (review.filter(
                                          (element) => element.review_skor == 2
                                        ).length /
                                          review.length) *
                                          100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="sum">2</span>
                              </li>
                              <li>
                                <div className="rating-stars">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                </div>
                                <div className="rating-progress">
                                  <div
                                    style={{
                                      width: `${parseInt(
                                        (review.filter(
                                          (element) => element.review_skor == 1
                                        ).length /
                                          review.length) *
                                          100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="sum">1</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* <!-- /Rating --> */}

                        {/* <!-- Reviews --> */}
                        <div className="col-md-6">
                          <div id="reviews">
                            <ul className="reviews">
                              {review.map((element) => {
                                const date = new Date(element.updatedAt);
                                const formattedDate = date
                                  .toISOString()
                                  .split("T")[0];
                                return (
                                  <li>
                                    <div className="review-heading">
                                      <h5 className="name">
                                        {element.account.username}
                                      </h5>
                                      <p className="date">{formattedDate}</p>
                                      <div className="review-rating">
                                        <i
                                          className={
                                            element.review_skor >= 1
                                              ? "fa fa-star"
                                              : "fa fa-star-o empty"
                                          }
                                        ></i>
                                        <i
                                          className={
                                            element.review_skor >= 2
                                              ? "fa fa-star"
                                              : "fa fa-star-o empty"
                                          }
                                        ></i>
                                        <i
                                          className={
                                            element.review_skor >= 3
                                              ? "fa fa-star"
                                              : "fa fa-star-o empty"
                                          }
                                        ></i>
                                        <i
                                          className={
                                            element.review_skor >= 4
                                              ? "fa fa-star"
                                              : "fa fa-star-o empty"
                                          }
                                        ></i>
                                        <i
                                          className={
                                            element.review_skor >= 5
                                              ? "fa fa-star"
                                              : "fa fa-star-o empty"
                                          }
                                        ></i>
                                      </div>
                                    </div>
                                    <div className="review-body p-3">
                                      <p>{element.review_text}</p>
                                    </div>
                                    {element.review_response ? (
                                      <div className="review-body shadow-inner p-3 bg-[#EFF3F3] rounded">
                                        <p>
                                          Penjual : {element.review_response}
                                        </p>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                            <ul className="reviews-pagination">
                              <li className="active">1</li>
                              <li>
                                <a href="#">2</a>
                              </li>
                              <li>
                                <a href="#">3</a>
                              </li>
                              <li>
                                <a href="#">4</a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fa fa-angle-right"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* <!-- /Reviews --> */}

                        {/* <!-- Review Form --> */}
                        <div className="col-md-3">
                          <div id="review-form">
                            <form className="review-form">
                              <textarea
                                onChange={(e) => {
                                  setReviewText(e.target.value);
                                }}
                                className="input"
                                placeholder="Your Review"
                              ></textarea>
                              <div className="input-rating">
                                <span>Your Rating: </span>
                                <div
                                  className="stars"
                                  onChange={(e) => {
                                    setReviewScore(e.target.value);
                                  }}
                                >
                                  <input
                                    id="star5"
                                    name="rating"
                                    value="5"
                                    type="radio"
                                  />
                                  <label htmlFor="star5"></label>
                                  <input
                                    id="star4"
                                    name="rating"
                                    value="4"
                                    type="radio"
                                  />
                                  <label htmlFor="star4"></label>
                                  <input
                                    id="star3"
                                    name="rating"
                                    value="3"
                                    type="radio"
                                  />
                                  <label htmlFor="star3"></label>
                                  <input
                                    id="star2"
                                    name="rating"
                                    value="2"
                                    type="radio"
                                  />
                                  <label htmlFor="star2"></label>
                                  <input
                                    id="star1"
                                    name="rating"
                                    value="1"
                                    type="radio"
                                  />
                                  <label htmlFor="star1"></label>
                                </div>
                              </div>
                              <button
                                className="primary-btn"
                                onClick={() => {
                                  addReview(reviewText, reviewScore, id).then(
                                    () => {
                                      refresh();
                                    }
                                  );
                                }}
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                        {/* <!-- /Review Form --> */}
                      </div>
                    </div>
                  )}
                </div>
                {/* <!-- /product tab content  --> */}
              </div>
            </div>
            {/* <!-- /product tab --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /SECTION --> */}
      {/* <!-- Section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h3 className="title">Related Products</h3>
              </div>
            </div>

            {/* <!-- product --> */}
            {productList.map((element, index) => {
              return index < 4 ? (
                <div className="col-md-3 col-xs-6" key={index}>
                  <div className="product">
                    <div className="product-img h-[342px] p-3 grid items-center">
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
                            refresh();
                            window.scrollTo({ top: 0 });
                          }}
                        >
                          {element.product_name}
                        </Link>
                      </h3>
                      <h4 className="product-price">
                        Rp{" "}
                        {Intl.NumberFormat("id-ID", {}).format(
                          element.product_price
                        )}
                      </h4>
                      <div className="product-rating"></div>
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
              ) : (
                <></>
              );
            })}
            {/* <!-- /product --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /Section --> */}

      <Footer />
    </>
  );
};
