import classes from "./Navigation.module.scss";

import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  return (
    <nav>
      <ul className={classes.nav}>
        <li
          className={`${location.pathname !== "/table" ? classes.active : ""}`}
        >
          <Link to={"/form"}>Form</Link>
        </li>
        <li
          className={`${location.pathname === "/table" ? classes.active : ""}`}
        >
          <Link to={"/table"}>Table</Link>
        </li>
      </ul>
    </nav>
  );
}
