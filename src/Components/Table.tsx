import { useState } from "react";
import classes from "./Table.module.scss";
import Form from "./Form";

export default function Table() {
  // const [name, setName] = useState(localStorage.getItem("name"));
  // const [email, setemail] = useState(localStorage.getItem("email"));
  // const [age, setAge] = useState(localStorage.getItem("age"));
  // const [gender, setGender] = useState(localStorage.getItem("gender"));

  const [mode, setMode] = useState(false);

  const modeHandler = () => {
    setMode(!mode);
  };
  const deleteHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  return mode ? (
    <>
      <Form edit={true} />
      <button onClick={modeHandler}>Cancel</button>
    </>
  ) : (
    <main className={classes.container}>
      <div className={classes.row}>
        <div className={classes.title}>Name</div>
        <div className={classes.data}>{localStorage.getItem("name")}</div>
      </div>

      <div className={classes.row}>{localStorage.getItem("email")}</div>
      <div className={classes.row}>{localStorage.getItem("age")}</div>
      <div className={classes.row}>{localStorage.getItem("gender")}</div>

      <button onClick={deleteHandler}>Delete</button>
      <button onClick={modeHandler}>Edit</button>
    </main>
  );
}
