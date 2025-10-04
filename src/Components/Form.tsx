import React, { useEffect, useState } from "react";
import classes from "./Form.module.scss";

type editModeValues = {
  edit?: boolean;
};

export default function Form({ edit = false }: editModeValues) {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [age, setAge] = useState<string>();
  const [gender, setGender] = useState<string>();

  useEffect(() => {
    if (edit) {
      setName(JSON.parse(localStorage.getItem("name")!));
      setEmail(JSON.parse(localStorage.getItem("email")!));
      setAge(JSON.parse(localStorage.getItem("age")!));
      setGender(JSON.parse(localStorage.getItem("gender")!));
    }
  }, [edit]);

  const sendData = (e: React.FormEvent) => {
    e?.preventDefault();

    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("age", JSON.stringify(age));
    localStorage.setItem("gender", JSON.stringify(gender));

    setName("");
    setEmail("");
    setAge("");
    setGender("");
  };

  return (
    <>
      <form onSubmit={sendData} className={`${""}`} id="contact">
        <input
          required
          value={name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          type="text"
          title="Name"
        ></input>
        <input
          required
          value={email || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          type="email"
          title="Email"
        ></input>
        <select
          required
          value={age}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setAge(e.target.value);
          }}
          name="age"
          id="ages"
        >
          <option value="- 10">- 10</option>
          <option value="10 - 35">11 - 35</option>
          <option value="+ 35">+ 35</option>
        </select>
        <input
          required
          checked={gender === "Male"}
          value="Male"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setGender(e.target.value);
          }}
          id="Male"
          type="radio"
          name="gender"
        ></input>
        <label htmlFor="Male">Male</label>
        <input
          checked={gender === "Female"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setGender(e.target.value);
          }}
          id="Female"
          type="radio"
          name="gender"
          value="Female"
        ></input>
        <label htmlFor="Female">Female</label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
