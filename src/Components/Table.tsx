import classes from "./Table.module.scss";

export default function Table() {
  const deleteHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      {localStorage.getItem("name")}
      {localStorage.getItem("email")}
      {localStorage.getItem("age")}
      {localStorage.getItem("gender")}

      <button onClick={deleteHandler}>Delete</button>
    </>
  );
}
