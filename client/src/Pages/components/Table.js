import { useState } from "react";
import styles from "./table.module.scss";

export const Table = ({ objArr, edit, handleSave, exclude = [] }) => {
  const [objArrState, setObjArrState] = useState(objArr);
  const [changes, setChanges] = useState([]);
  // const keys = Object.keys(objArr[0]).filter((key) => !exclude.includes(key));
  const keys = [];
  objArr.map((obj) =>
    Object.keys(obj).filter(
      (key) => !keys.includes(key) && !exclude.includes(key) && keys.push(key)
    )
  );
  const handleChange = (e, key) => {
    const id = e.id;
    const newValue = e.value;
    setObjArrState(
      objArrState.map((obj) =>
        obj._id === id ? { ...obj, [key]: newValue } : obj
      )
    );
  };
  return (
    <>
      <table className={styles.Table}>
        <thead>
          <tr>
            {keys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {objArr.map((obj) => (
            <tr>
              {keys.map((key) => (
                <th>
                  {typeof obj[key] !== "string" ? (
                    <TableDropDown array={obj[key]} edit={edit} />
                  ) : edit ? (
                    <input
                      placeholder={obj[key]}
                      id={obj._id}
                      onChange={(e) => handleChange(e.target, key)}
                    />
                  ) : (
                    obj[key]
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {edit && <button onClick={() => handleSave(objArrState)}>Save</button>}
    </>
  );
};
const TableDropDown = ({ array, edit }) => {
  return <div>dropdown</div>;
};
