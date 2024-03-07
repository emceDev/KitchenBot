import { useUtilities } from "./hooks";
import { useState } from "react";
import { useEditUtilityMutation } from "../../State/services";
import { Table } from "../components/Table";
import { useParams } from "react-router-dom";
import { CreateUtility } from "./CreateUtility";
export const UtilityList = () => {
  let { m_id } = useParams();
  const { data, error, isLoading } = useUtilities(m_id);
  const [editUtilitiesShown, setEditUtilitiesShown] = useState(false);
  const [createUtilityShown, setCreateUtilityShown] = useState(false);

  const [editUtility] = useEditUtilityMutation();

  const handleSave = (newData) => {
    console.log("saving utilities");
    const old = data.utilities;
    if (newData === data.utilities) {
      console.log("equal");
    } else {
      old.forEach((obj) => {
        newData.forEach((obj2) => {
          if (obj._id === obj2._id) {
            obj !== obj2 &&
              editUtility({ m_id, u_id: obj2._id, data: { ...obj2 } });
          }
        });
      });
    }
  };
  return (
    <div>
      UTILITIES:
      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data.utilities.length > 0 ? (
          <>
            {!editUtilitiesShown ? (
              <Table
                objArr={data.utilities}
                exclude={["_id", "options", "jobType"]}
              />
            ) : (
              <Table
                objArr={data.utilities}
                edit={true}
                handleSave={handleSave}
                exclude={["_id", "options", "jobType"]}
              />
            )}

            <button onClick={() => setEditUtilitiesShown(!editUtilitiesShown)}>
              {editUtilitiesShown ? "utility list" : "edit utilities"}
            </button>
          </>
        ) : null}
      </div>
      {createUtilityShown && <CreateUtility m_id={m_id} />}
      <button onClick={() => setCreateUtilityShown(!createUtilityShown)}>
        Add Utility
      </button>
    </div>
  );
};
