import { useEffect, useState } from "react";
import classes from "./Table.module.scss";
import Form from "./Form";

export default function Table() {
  const [tableArray, setTableArray] = useState([]);
  const [mode, setMode] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(0);
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(false);

  useEffect(() => {
    // for isLocalStorageEmpty initial value
    setIsLocalStorageEmpty(getLocalStorageStatus() ? true : false);
    setTableArray(JSON.parse(localStorage.getItem("tableArray") || "[]"));
  }, [mode]);

  const modeHandler = (i: number) => {
    setMode(!mode);
    setEditIndex(i);
  };
  const deleteHandler = (i: number) => {
    tableArray.splice(i, 1);
    setTableArray([...tableArray]);
    localStorage.setItem("tableArray", JSON.stringify(tableArray));
    getLocalStorageStatus() && setIsLocalStorageEmpty(true);
  };

  const getLocalStorageStatus = () => {
    return JSON.parse(localStorage.getItem("tableArray") || "[]")?.length === 0;
  };

  const tableContent = isLocalStorageEmpty ? (
    <>No Data</>
  ) : (
    <main className={classes.container}>
      {tableArray.map((item: any, i: number) => (
        <div className={classes.user} key={i}>
          <div className={classes.userTitle}>{i + 1}</div>
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
          <div className={classes.userContainer}>
            <span className={classes.title}>File</span>
            <span className={classes.data}>
              <img src={item.file} width="200px" height="200px" />
            </span>
          </div>

          <div className={classes.actionButtons}>
            <button
              className={classes.actionButton}
              onClick={() => deleteHandler(i)}
            >
              Delete
            </button>
            <button
              className={classes.actionButton}
              onClick={() => {
                modeHandler(i);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </main>
  );

  return mode ? (
    <>
      <Form edit={true} setEdit={setMode} editIndex={editIndex} />
      <button
        className={classes.actionButton}
        onClick={() => {
          setMode(false);
        }}
      >
        Cancel
      </button>
    </>
  ) : (
    tableContent
  );
}
