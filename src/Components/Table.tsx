import { useEffect, useState } from "react";
import classes from "./Table.module.scss";
import Form from "./Form";

export default function Table() {
  const [mode, setMode] = useState(false);
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(false);

  useEffect(() => {
    // for isLocalStorageEmpty initial value
    setIsLocalStorageEmpty(
      localStorage.getItem("name") === null ? true : false
    );
  });

  const modeHandler = () => {
    setMode(!mode);
  };
  const deleteHandler = () => {
    localStorage.clear();
    setIsLocalStorageEmpty(true);
  };

  const tableContent = isLocalStorageEmpty ? (
    <>No Data</>
  ) : (
    <main className={classes.container}>
      <div className={classes.row}>
        <div className={classes.title}>Name</div>
        <div className={classes.data}>
          {JSON.parse(localStorage.getItem("name")!)}
        </div>
      </div>

      <div className={classes.row}>
        {JSON.parse(localStorage.getItem("email")!)}
      </div>
      <div className={classes.row}>
        {JSON.parse(localStorage.getItem("age")!)}
      </div>
      <div className={classes.row}>
        {JSON.parse(localStorage.getItem("gender")!)}
      </div>

      <button onClick={deleteHandler}>Delete</button>
      <button onClick={modeHandler}>Edit</button>
    </main>
  );

  return mode ? (
    <>
      <Form edit={true} />
      <button onClick={modeHandler}>Cancel</button>
    </>
  ) : (
    tableContent
  );
}
