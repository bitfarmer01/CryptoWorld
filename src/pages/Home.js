import { Link } from "react-router-dom";

import "./Home.css";
export default function Home() {
  return (
    <div>
      <div className="page_header">
        <Link to="/" className="page_header--logo">
          CryptoWorld
        </Link>
      </div>
      <div className="home_container">
        <header className="home_header">
          <div className="header__logo-box"></div>

          <div className="header__text-box">
            <h1 className="heading-primary">
              <span className="heading-primary--main"></span>
            </h1>
            <Link to="./News" className="home_link home_button button--white">
              Table
            </Link>
            <Link
              to="./Graphs"
              className=" home_link home_button button--white"
            >
              Graphs
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
