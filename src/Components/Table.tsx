// import classes from "./Table.module.scss";

import { useContext, useEffect, useState } from "react";

import Form from "./Form";
import { DataContext } from "../store/Contexts";

export default function Table() {
  const [tableArray, setTableArray] = useState([]);
  const [mode, setMode] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(0);
  const [isContextEmpty, setIsContextEmpty] = useState(false);

  // localStorage Code
  //*************************** */
  // const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(false);
  //*************************** */

  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    // for isLocalStorageEmpty initial value

    // localStorage Code
    //*************************** */
    // setIsLocalStorageEmpty(getLocalStorageStatus() ? true : false);
    // setTableArray(JSON.parse(localStorage.getItem("tableArray") || "[]"));
    //*************************** */

    setIsContextEmpty(getContextStatus() ? true : false);
    setTableArray(data);
  }, [mode]);

  const modeHandler = (i: number) => {
    setMode(!mode);
    setEditIndex(i);
  };
  const deleteHandler = (i: number) => {
    tableArray.splice(i, 1);
    setTableArray([...tableArray]);
    // localStorage.setItem("tableArray", JSON.stringify(tableArray));
    setData(tableArray);
    getContextStatus() && setIsContextEmpty(true);
  };

  // this for previewing images in new tabs workaround
  const previewFileHandler = (file: string) => {
    const win = window.open(file, "_blank");
    win!.document.write(`
        <html>
          <head><title>Image</title></head>
          <body style="margin:0; display:flex; align-items:center; justify-content:center; height:100vh; background:#000;">
            <img src="${file}" style="max-width:90%; max-height:90%;" />
          </body>
        </html>
    `);
  };

  // localStorage Code
  //*************************** */
  // const getLocalStorageStatus = () => {
  //   return JSON.parse(localStorage.getItem("tableArray") || "[]")?.length === 0;
  // };
  //*************************** */

  const getContextStatus = () => {
    return data.length === 0;
  };

  const tableContent = isContextEmpty ? (
    <>No Data</>
  ) : (
    <>
      <table className="table table-striped table-responsive table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col" className="text-center">
              #
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">File</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, i: number) => (
            <tr key={i}>
              <th scope="row" className="text-center">
                {i + 1}
              </th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>
                <a
                  href=""
                  onClick={() => {
                    previewFileHandler(item.file);
                  }}
                >
                  Preview
                </a>
              </td>
              <td>
                <div className="h-100 d-flex flex-column justify-content-between gap-3">
                  <button
                    className={`btn btn-danger`}
                    onClick={() => deleteHandler(i)}
                  >
                    Delete
                  </button>
                  <button
                    className={`btn btn-secondary`}
                    onClick={() => {
                      modeHandler(i);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return mode ? (
    <Form edit={true} setEdit={setMode} editIndex={editIndex} />
  ) : (
    tableContent
  );
}
