import React, { useEffect, useState } from "react";
import classes from "./Form.module.scss";

type editModeValues = {
  edit?: boolean;
  setEdit?: any;
  editIndex?: number;
};

export default function Form({
  edit = false,
  setEdit = () => {},
  editIndex = -1,
}: editModeValues) {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>();
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    // if it edit page, it will set the values to the localstorage values
    if (edit) {
      let selectedEditValue = JSON.parse(
        localStorage.getItem("tableArray") || "[]"
      ).splice(editIndex, 1);

      setName(selectedEditValue[0].name);
      setEmail(selectedEditValue[0].email);
      setAge(selectedEditValue[0].age);
      setGender(selectedEditValue[0].gender);
    }
  }, [edit]);

  const fileHandler = (e: any) => {
    const fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);

    fr.onload = (e) => {
      setFile(e.target!.result);
    };
  };

  const sendData = (e: React.FormEvent) => {
    // store data in localstorage if form is submitted
    e?.preventDefault();

    if (edit) {
      let newEditArray = JSON.parse(localStorage.getItem("tableArray") || "[]");

      if (file !== null) {
        newEditArray[editIndex] = { name, email, age, gender, file };
      } else {
        newEditArray[editIndex] = {
          name,
          email,
          age,
          gender,
          file: newEditArray[editIndex].file,
        };
      }

      localStorage.setItem("tableArray", JSON.stringify(newEditArray));
      setEdit(false);
    } else {
      localStorage.setItem(
        "tableArray",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("tableArray") || "[]"),
          { name, email, age, gender, file },
        ])
      );
    }

    // reset data
    setName("");
    setEmail("");
    setAge("");
    setGender("");
    setFile("");

    alert("Data saved in localStorage Successfully");
  };

  return (
    <>
      <form onSubmit={sendData} className={classes.form} id="contact">
        <input
          required
          placeholder="Your Name"
          value={name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          type="text"
          title="Name"
        ></input>
        <input
          required
          placeholder="Your Email"
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
          <option value="" disabled>
            Please Select Your Age Range
          </option>
          <option value="- 10">- 10</option>
          <option value="10 - 35">11 - 35</option>
          <option value="+ 35">+ 35</option>
        </select>
        <div className={classes.radio}>
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
        <input
          required={!edit}
          type="file"
          accept="image/*"
          onChange={fileHandler}
        />

        <button type="submit" className={classes.submitButton}>
          {edit ? "Edit" : "Submit"}
        </button>
      </form>
    </>
  );
}
