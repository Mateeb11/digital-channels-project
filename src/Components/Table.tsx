// import classes from "./Table.module.scss";

import { useEffect, useState } from "react";

import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store";

export default function Table() {
  // const [tableArray, setTableArray] = useState([]);
  const [mode, setMode] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(0);
  const [isContextEmpty, setIsContextEmpty] = useState(true);
  const [isPreviewFile, setIsPreviewFile] = useState(false);
  const [previewFile, setPreviewFile] = useState("");

  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.items);

  // localStorage Code
  //*************************** */
  // const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(false);
  //*************************** */

  useEffect(() => {
    getContextStatus() && setIsContextEmpty(true);
  }, [items]);

  useEffect(() => {
    // for isLocalStorageEmpty initial value

    // localStorage Code
    //*************************** */
    // setIsLocalStorageEmpty(getLocalStorageStatus() ? true : false);
    // setTableArray(JSON.parse(localStorage.getItem("tableArray") || "[]"));
    //*************************** */

    setIsContextEmpty(getContextStatus() ? true : false);

    // setTableArray(items);
  }, [mode]);

  const modeHandler = (i: number) => {
    setMode(!mode);
    setEditIndex(i);
  };
  const deleteHandler = (i: number) => {
    // tableArray.splice(i, 1);
    // setTableArray([...tableArray]);
    // localStorage.setItem("tableArray", JSON.stringify(tableArray));
    dispatch(dataActions.removeData(i));
    getContextStatus() && setIsContextEmpty(true);
  };

  // this for previewing images in new tabs workaround
  const previewFileHandler = (file: string) => {
    // const win = window.open(file, "_blank");
    // win!.document.write(`
    //     <html>
    //       <head><title>Image</title></head>
    //       <body style="margin:0; display:flex; align-items:center; justify-content:center; height:100vh; background:#000;">
    //         <img src="${file}" style="max-width:90%; max-height:90%;" />
    //       </body>
    //     </html>
    // `);

    setIsPreviewFile(true);
    setPreviewFile(file);
  };

  // localStorage Code
  //*************************** */
  // const getLocalStorageStatus = () => {
  //   return JSON.parse(localStorage.getItem("tableArray") || "[]")?.length === 0;
  // };
  //*************************** */

  const getContextStatus = () => {
    return items.data.length === 0;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const previewModal = (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Preview</h5>
            <button
              className="btn-close"
              onClick={() => setIsPreviewFile(false)}
            ></button>
          </div>
          <div className="modal-body">
            <img src={previewFile} />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setIsPreviewFile(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
            <th scope="col">Timer</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.data.map((item: any, i: number) => (
            <tr key={i}>
              <th scope="row" className="text-center">
                {i + 1}
              </th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>
                <button
                  className="btn btn-link p-0"
                  onClick={() => {
                    previewFileHandler(item.file);
                  }}
                >
                  Preview
                </button>
                {isPreviewFile && previewModal}
              </td>
              <td>{formatTime(item.time)}</td>
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
