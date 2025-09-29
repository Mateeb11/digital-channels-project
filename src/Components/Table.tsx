import classes from "./Table.module.scss";

export default function Table() {
  return (
    <>
      {localStorage.getItem("name")}
      {localStorage.getItem("email")}
      {localStorage.getItem("age")}
      {localStorage.getItem("gender")}
    </>
  );
}
