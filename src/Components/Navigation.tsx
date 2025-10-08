// import classes from "./Navigation.module.scss";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../store/Contexts";

export default function Navigation({ children }: any) {
  const [data, setData] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (data.length === 0) return;

    const timer = setInterval(() => {
      const newArray = data;
      newArray.map((item: any, i: number) => {
        item.time = item.time - 1;
        if (item.time === 0) {
          const newArray = data;
          newArray.splice(i, 1);
        }
      });
      setData([...newArray]);
    }, 1000);

    return () => clearInterval(timer);
  });
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
