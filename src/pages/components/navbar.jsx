import "../../assets/css/slick-theme.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/font-awesome.min.css";
import "../../assets/css/nouislider.min.css";
import "../../assets/css/slick.css";
import "../../assets/css/style.css";
import "../../assets/css/index.css";
import { useEffect, useState } from "react";
import { getCategory } from "../../controller/categoryController";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Navbar = () => {
  const [navbarItem, setNavbarItem] = useState([]);
  const [activePage, setActivePage] = useState("home");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get("category") || "";

  const refresh = () => {
    getCategory().then((response) => setNavbarItem(response));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      {/* <!-- NAVIGATION --> */}
      <nav id="navigation">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- responsive-nav --> */}
          <div id="responsive-nav">
            {/* <!-- NAV --> */}
            <ul className="main-nav nav navbar-nav flex flex-row navbar-text m-0">
              <li
                className={`
                        cursor-pointer
                        ${
                          activePage == "home" && searchCategory == ""
                            ? "active"
                            : ""
                        }`}
                onClick={() => {
                  setActivePage("home");
                }}
              >
                <a href="/dashboard">Home</a>
              </li>
              {navbarItem.map((element, index) => {
                if (index < 5) {
                  return (
                    <li
                      key={index}
                      className={`
                        cursor-pointer
                        ${
                          activePage == element.category_name ||
                          searchCategory == element.category_id
                            ? "active"
                            : ""
                        }`}
                      onClick={() => {
                        setActivePage(element.category_name);
                      }}
                    >
                      <a
                        onClick={() => {
                          navigate({
                            pathname: "/store",
                            search: `?category=${element.category_id}`,
                          });
                        }}
                      >
                        {element.category_name}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
            {/* <!-- /NAV --> */}
          </div>
          {/* <!-- /responsive-nav --> */}
        </div>
        {/* <!-- /container --> */}
      </nav>
      {/* <!-- /NAVIGATION --> */}
    </>
  );
};
