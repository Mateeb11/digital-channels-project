import { useRef } from "react";
import classes from "./Form.module.scss";

export default function Form() {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLSelectElement>(null);

  const form = useRef<HTMLFormElement>(null);

  const sendData = (e: React.FormEvent) => {
    e?.preventDefault();
    console.log(name.current?.value);
    console.log(email.current?.value);
    console.log(age.current?.value);
    console.log(gender.current?.value);

    localStorage.setItem("name", JSON.stringify(name.current?.value));
    localStorage.setItem("email", JSON.stringify(email.current?.value));
    localStorage.setItem("age", JSON.stringify(age.current?.value));
    localStorage.setItem("gender", JSON.stringify(gender.current?.value));

    form.current?.reset();
  };
  return (
    <>
      <form ref={form} onSubmit={sendData} className={`${""}`} id="contact">
        <input required ref={name} type="text" title="Name"></input>
        <input required ref={email} type="email" title="Email"></input>
        <select required ref={age} name="age" id="ages">
          <option value="- 10">- 10</option>
          <option value="10 - 35">11 - 35</option>
          <option value="+ 35">+ 35</option>
        </select>
        <input
          ref={gender}
          defaultChecked
          id="Male"
          type="radio"
          name="gender"
          value="Male"
        ></input>
        <label htmlFor="Male">Male</label>
        <input id="Female" type="radio" name="gender" value="Female"></input>
        <label htmlFor="Female">Female</label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
