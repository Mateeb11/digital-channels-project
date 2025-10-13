import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store";
// import classes from "./Form.module.scss";

type editModeValues = {
  edit?: boolean;
  setEdit?: any;
  editIndex?: number;
};

const timer: number = 120;

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

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isAgeValid, setIsAgeValid] = useState(false);
  const [isGenderValid, setIsGenderValid] = useState(false);

  const [alertStatus, setAlertStatus] = useState(false);

  const fileInputRef = useRef<any>(null);

  // const { data, setData } = useContext(DataContext);

  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.items);

  useEffect(() => {
    // if it edit page, it will set the values to the localstorage values
    if (edit && items.data.length !== 0) {
      setName(items.data[editIndex].name);
      setEmail(items.data[editIndex].email);
      setAge(items.data[editIndex].age);
      setGender(items.data[editIndex].gender);
    }
  }, [edit]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAlertStatus(false);
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [alertStatus]);

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

    setIsFormSubmitted(true);

    if (!isEmailValid && !isNameValid && !isGenderValid && !isAgeValid) return;

    if (edit) {
      // localStorage Code
      //*************************** */
      // let newEditArray = JSON.parse(localStorage.getItem("tableArray") || "[]");
      // if (file !== null) {
      //   newEditArray[editIndex] = { name, email, age, gender, file };
      // } else {
      //   newEditArray[editIndex] = {
      //     name,
      //     email,
      //     age,
      //     gender,
      //     file: newEditArray[editIndex].file,
      //   };
      // }
      //   localStorage.setItem("tableArray", JSON.stringify(newEditArray));
      // let newEditArray = data;
      //*************************** */

      let newEditItem = {};
      if (file !== null) {
        newEditItem = {
          name,
          email,
          age,
          gender,
          file,
          time: timer,
        };
      } else {
        newEditItem = {
          name,
          email,
          age,
          gender,
          file: items.data[editIndex].file,
          time: timer,
        };
      }
      dispatch(dataActions.editData({ index: editIndex, item: newEditItem }));
      setEdit(false);
    } else {
      // localStorage Code
      //*************************** */
      // localStorage.setItem(
      //   "tableArray",
      //   JSON.stringify([
      //     ...JSON.parse(localStorage.getItem("tableArray") || "[]"),
      //     { name, email, age, gender, file },
      //   ])
      // );
      //*************************** */

      dispatch(
        dataActions.addData({ name, email, age, gender, file, time: timer })
      );
    }

    // reset data
    setName("");
    setEmail("");
    setAge("");
    setGender("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.type = "text";
      fileInputRef.current.type = "file";
    }

    setAlertStatus(true);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (emailRegex.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <>
      {alertStatus && (
        <div className="alert alert-success alert-dismissible" role="alert">
          <div>Data saved to Context Successfully</div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <form onSubmit={sendData} className={`container row gap-3`} id="contact">
        <div className={`row`}>
          <div className={`col`}>
            <label htmlFor="name" className={`form-label`}>
              Name
            </label>
            <input
              className={`form-control ${
                isFormSubmitted && (isNameValid ? "is-valid" : "is-invalid")
              }`}
              placeholder="Your Name"
              value={name || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value === ""
                  ? setIsNameValid(false)
                  : setIsNameValid(true);
                setName(e.target.value);
              }}
              type="text"
              title="Name"
              id="name"
            ></input>
            <span className="invalid-feedback">Please enter a name</span>
          </div>
          <div className={`col`}>
            <label htmlFor="email" className={`form-label`}>
              Email
            </label>
            <input
              className={`form-control ${
                isFormSubmitted && (isEmailValid ? "is-valid" : "is-invalid")
              }`}
              placeholder="Your Email"
              value={email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                validateEmail(e.target.value);
                setEmail(e.target.value);
              }}
              type="email"
              title="Email"
              id="email"
            ></input>
            <span className="invalid-feedback">Please enter a valid email</span>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col`}>
            <label htmlFor="ages" className={`form-label`}>
              Age
            </label>
            <select
              className={`form-select`}
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
              <option value="11 - 35">11 - 35</option>
              <option value="+ 35">+ 35</option>
            </select>
          </div>
          <div className={`col align-self-center`}>
            <label htmlFor="gender" className={`form-label row ms-1`}>
              Gender
            </label>
            <div className={`form-check form-check-inline`}>
              <label htmlFor="Male" className={`form-check-label`}>
                Male
              </label>
              <input
                className={`form-check-input`}
                checked={gender === "Male"}
                value="Male"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setGender(e.target.value);
                }}
                id="Male"
                type="radio"
                name="gender"
              ></input>
            </div>
            <div className={`form-check form-check-inline`}>
              <label htmlFor="Female" className={`form-check-label`}>
                Female
              </label>
              <input
                className={`form-check-input`}
                checked={gender === "Female"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setGender(e.target.value);
                }}
                id="Female"
                type="radio"
                name="gender"
                value="Female"
              ></input>
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col`}>
            <label htmlFor="file" className={`form-label`}>
              Upload Image
            </label>
            <input
              className={`form-control`}
              type="file"
              accept="image/*"
              onChange={fileHandler}
              id="file"
              ref={fileInputRef}
            />
          </div>
          <div className={`col align-self-end gap-3 d-flex`}>
            <button
              type="submit"
              className={`btn btn-primary flex-grow-1 w-100`}
            >
              {edit ? "Edit" : "Submit"}
            </button>
            {edit && (
              <button
                className={`btn btn-danger w-100`}
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
