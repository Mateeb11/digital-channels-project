// import classes from "./Navigation.module.scss";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../store/Contexts";

export default function Navigation({ children }: any) {
  const [data, setData] = useState([]);

  const location = useLocation();
  return (
    <div className={`card`}>
      <nav className={`card-header`}>
        <ul className={`nav nav-tabs card-header-tabs`}>
          <li className={`nav-item`}>
            <Link
              className={`nav-link ${
                location.pathname !== "/digital-channels-project/table"
                  ? "active"
                  : ""
              }`}
              to={"/digital-channels-project/form"}
            >
              Form
            </Link>
          </li>
          <li className={`nav-item`}>
            <Link
              className={`nav-link ${
                location.pathname === "/digital-channels-project/table"
                  ? "active"
                  : ""
              }`}
              to={"/digital-channels-project/table"}
            >
              Table
            </Link>
          </li>
        </ul>
      </nav>
      <DataContext value={{ data, setData }}>
        <div className={`card-body`}>{children}</div>
      </DataContext>
    </div>
  );
}
