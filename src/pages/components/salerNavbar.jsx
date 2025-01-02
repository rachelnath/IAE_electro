import { useState } from "react";
import "../../assets/css/tailwind.output.css";
import { Link } from "react-router-dom";

export const SalerNavbar = ({ page }) => {
  return (
    <>
      {/* <!-- Desktop sidebar --> */}
      <aside className="z-20 flex-shrink-0 w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link
            className={`ml-6 text-lg font-bold dark:text-gray-200 ${
              page == "dashboard" ? "text-gray-800" : ""
            }`}
            to="/saler/dashboard"
            onClick={(e) => {
              e.preventDefault();
              setPage("dashboard");
            }}
          >
            Windmill
          </Link>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              {page == "dashboard" ? (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              ) : (
                <></>
              )}
              <a
                className="inline-flex items-center w-full text-sm text-gray-800 font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                href="/saler/dashboard"
              >
                <svg
                  className="w-7 h-7"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="ml-4 text-lg">Dashboard</span>
              </a>
            </li>
          </ul>
          <ul>
            <li className="relative px-6 py-3">
              {page == "review" ? (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              ) : (
                <></>
              )}
              <Link
                className={`inline-flex items-center w-full text-sm font-semibold  transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100 ${
                  page == "review" ? "text-gray-800" : ""
                }`}
                to="/saler/review"
              >
                <svg
                  className="w-7 h-7"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
                <span className="ml-4 text-lg">Review</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
