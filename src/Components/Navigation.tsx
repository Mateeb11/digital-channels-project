import classes from "./Navigation.module.scss";

import { Link, useLocation } from "react-router-dom";

export default function Navigation({ children }: any) {
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
      <div className={`card-body`}>{children}</div>
    </div>
  );
}
