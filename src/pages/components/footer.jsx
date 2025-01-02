import { useEffect, useState } from "react";
import "../../assets/css/slick-theme.css";
import "../../assets/css/slick.css";
import "../../assets/css/style.css";
import dokuIcon from "../../assets/logo/doku-icon.png";
import { getCategory } from "../../controller/categoryController";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const refresh = () => {
    getCategory().then((response) => setCategory(response));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      {/* <!-- FOOTER --> */}
      <footer id="footer">
        {/* <!-- top footer --> */}
        <div className="section">
          {/* <!-- container --> */}
          <div className="container">
            {/* <!-- row --> */}
            <div className="row ">
              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">About Us</h3>
                  <p className="mb-3">
                    E-Commerce Tugas Besar Telkom University Purwokerto
                  </p>
                  <ul className="footer-links">
                    <li>
                      <a>
                        <i className="fa fa-map-marker"></i>Jl. DI Panjaitan
                        No.128, Karangreja, Purwokerto Kidul, Kec. Purwokerto
                        Sel., Kabupaten Banyumas, Jawa Tengah 53147
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="fa fa-phone"></i>+021-95-51-84
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="fa fa-envelope-o"></i>
                        email@student.telkomuniversity.ac.id
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">Categories</h3>
                  <ul className="footer-links">
                    {category.map((element, index) => {
                      return (
                        <li key={index}>
                          <a
                            onClick={() => {
                              navigate({
                                pathname: "/store",
                                search: `?category=${element.category_id}`,
                              });
                              window.scrollTo({ top: 0 });
                            }}
                            href=""
                          >
                            {element.category_name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="clearfix visible-xs"></div>

              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">Service</h3>
                  <ul className="footer-links">
                    <li>
                      <a href="/transaction">Track My Order</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- /row --> */}
          </div>
          {/* <!-- /container --> */}
        </div>
        {/* <!-- /top footer --> */}

        {/* <!-- bottom footer --> */}
        <div id="bottom-footer" className="section">
          <div className="container">
            {/* <!-- row --> */}
            <div className="row">
              <div className="col-md-12 text-center">
                <ul className="footer-payments">
                  <li>
                    <img src={dokuIcon} alt="" className="w-20" />
                  </li>
                </ul>
                <span className="copyright">
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                  Copyright &copy; All rights reserved
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                </span>
              </div>
            </div>
            {/* <!-- /row --> */}
          </div>
          {/* <!-- /container --> */}
        </div>
        {/* <!-- /bottom footer --> */}
      </footer>
      {/* <!-- /FOOTER --> */}
    </>
  );
};
