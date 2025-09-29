import classes from "./Navigation.module.scss";

import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <ul>
        <li>
          <Link to={"/form"}>Form</Link>
        </li>
        <li>
          <Link to={"/table"}>Table</Link>
        </li>
      </ul>
    </>
  );
}
