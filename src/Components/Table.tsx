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
        <div className={classes.title}>Email</div>
        <div className={classes.data}>
          {JSON.parse(localStorage.getItem("email")!)}
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>Age</div>
        <div className={classes.data}>
          {JSON.parse(localStorage.getItem("age")!)}
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>Gender</div>
        <div className={classes.data}>
          {JSON.parse(localStorage.getItem("gender")!)}
        </div>
      </div>
      <div className={classes.actionButtons}>
        <button className={classes.actionButton} onClick={deleteHandler}>
          Delete
        </button>
        <button className={classes.actionButton} onClick={modeHandler}>
          Edit
        </button>
      </div>
    </main>
  );

  return mode ? (
    <>
      <Form edit={true} />
      <button className={classes.actionButton} onClick={modeHandler}>
        Cancel
      </button>
    </>
  ) : (
    tableContent
  );
}
