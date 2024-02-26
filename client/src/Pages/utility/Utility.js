import { useEffect, useState } from "react";
import {
  useCreateUtilityMutation,
  useEditUtilityMutation,
  useGetUtilityListQuery,
} from "../../State/services";
import { useParams } from "react-router-dom";
import { Table } from "../components/Table";

export const UtilityList = () => {
  let { m_id } = useParams();
  const { data, error, isLoading } = useUtilities(m_id);
  const [editUtilitiesShown, setEditUtilitiesShown] = useState(false);
  const [createUtilityShown, setCreateUtilityShown] = useState(false);

  const [editUtility] = useEditUtilityMutation();

  const handleSave = (newData) => {
    console.log("saving utilityies");
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
              <Table objArr={data.utilities} />
            ) : (
              <Table
                objArr={data.utilities}
                edit={true}
                handleSave={handleSave}
                exclude={["_id", "options"]}
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
export const useUtilities = () => {
  let { m_id } = useParams();
  const { data, error, isLoading } = useGetUtilityListQuery(m_id);
  return { data, error, isLoading };
};
export const EditUtility = ({ m_id, u_id }) => {
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [position, setPosition] = useState(null);
  const { utility } = useGetUtilityListQuery(m_id, {
    selectFromResult: ({ data }) => ({
      utility: data.utilities.find((util) => util._id === u_id),
    }),
  });
  const [editUtility] = useEditUtilityMutation();
  return (
    <div>
      Utility
      <label>
        Name
        <input
          placeholder={utility.name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Type:
        <input
          placeholder={utility.type}
          onChange={(e) => setType(e.target.value)}
        />
      </label>
      <label>
        Position
        <input
          placeholder={utility.position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </label>
      <button
        onClick={() => {
          editUtility({ m_id, u_id, data: { name, position, type } });
        }}
      >
        Save
      </button>
    </div>
  );
};
export const Utility = ({ utility }) => {
  const [optionsShown, setOptionsShown] = useState(false);
  return (
    <div>
      {console.log(utility)}
      <div>
        <label>
          Name:
          {utility.name}
        </label>
        <label>
          Type:
          {utility.type}
        </label>
        <label>
          Position:
          {utility.position}
        </label>
      </div>
      {/* {utility.type === "container" ? utility.contents.name : utility.name}, */}
      {/* {optionsShown && <UtilityOptions options={utility.options} />} */}
      {/* <button onClick={() => setOptionsShown(!optionsShown)}>Options</button> */}
    </div>
  );
};
export const CreateUtility = ({ m_id }) => {
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [position, setPosition] = useState(null);

  const [createUtility, res] = useCreateUtilityMutation();
  return (
    <div>
      <label>
        name:<input onChange={(e) => setName(e.target.value)}></input>
      </label>
      <label>
        type:
        <input type="text" onChange={(e) => setType(e.target.value)} />
      </label>
      <label>
        position:
        <input type="Number" onChange={(e) => setPosition(e.target.value)} />
      </label>
      <button
        onClick={() =>
          createUtility({
            m_id: m_id,
            name,
            type,
            position,
          })
        }
      >
        save
      </button>
    </div>
  );
};
