import { useEffect, useState } from "react";
import classes from "./Table.module.scss";
import Form from "./Form";

export default function Table() {
  const [tableArray, setTableArray] = useState([]);
  const [mode, setMode] = useState(false);
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(false);

  useEffect(() => {
    // for isLocalStorageEmpty initial value
    // setIsLocalStorageEmpty(
    //   localStorage.getItem("name") === null ? true : false
    // );
    setTableArray(JSON.parse(localStorage.getItem("tableArray") || "[]"));
  }, []);

  const modeHandler = () => {
    setMode(!mode);
  };
  const deleteHandler = (i: number) => {
    tableArray.splice(i, 1);
    setTableArray([...tableArray]);
    localStorage.setItem("tableArray", JSON.stringify(tableArray));
    // setIsLocalStorageEmpty(true);
  };

  const tableContent = isLocalStorageEmpty ? (
    <>No Data</>
  ) : (
    <main className={classes.container}>
      {tableArray.map((item: any, i: number) => (
        <div className={classes.user} key={i}>
          {/* <div className={classes.userTitle}>{i + 1}</div> */}
          <div className={classes.userContainer}>
            <span className={classes.title}>Name</span>
            <span className={classes.data}>{item.name}</span>
          </div>
          <div className={classes.userContainer}>
            <span className={classes.title}>Email</span>
            <span className={classes.data}>{item.email}</span>
          </div>
          <div className={classes.userContainer}>
            <span className={classes.title}>Age</span>
            <span className={classes.data}>{item.age}</span>
          </div>
          <div className={classes.userContainer}>
            <span className={classes.title}>Gender</span>
            <span className={classes.data}>{item.gender}</span>
          </div>

          <div className={classes.actionButtons}>
            <button
              className={classes.actionButton}
              onClick={() => deleteHandler(i)}
            >
              Delete
            </button>
            <button className={classes.actionButton} onClick={modeHandler}>
              Edit
            </button>
          </div>
        </div>
      ))}
    </main>
  );

  return mode ? (
    <>
      <Form edit={true} setEdit={setMode} />
      <button className={classes.actionButton} onClick={modeHandler}>
        Cancel
      </button>
    </>
  ) : (
    tableContent
  );
}
