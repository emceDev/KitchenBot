import { useEffect, useState } from "react";
// import {
//   useCreateMachineMutation,
//   useGetMachineByIdQuery,
// } from "../../../client/src/State/services";
import { NavLink, Outlet, useParams } from "react-router-dom";
import styles from "./Machine.module.scss";
import {
  useCreateMachineMutation,
  useGetMachineByIdQuery,
} from "../state/apiSlice";
// import { useUtilities } from "../../../client/src/Pages/Utility/hooks";
const xm_id = "64eb29f108d0b25211afc486";
export const Machine = () => {
  return (
    <div>
      {/* <CreateMachine /> */}
      <GetMachine />
      {/* <CreateUtility /> */}
      <Outlet />
    </div>
  );
};

const MachineData = () => {
  const [name, setName] = useState("no name");
  const [id, setId] = useState("no id");
  return (
    <div>
      <label>
        name: <p>{name}</p>
      </label>
      <label>
        id:<p>{id}</p>
      </label>
    </div>
  );
};

const GetMachine = () => {
  let { m_id } = useParams();
  const { data, error, isLoading } = useGetMachineByIdQuery(m_id);
  // const utilities = useUtilities(m_id);
  // console.log(m_id);

  return (
    <div>
      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <div className={styles.MachineNavBar}>
              <h2>{data.name}</h2>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

const CreateMachine = () => {
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  // const [createMachine, res] = useCreateMachineMutation();
  const [createMachine, res] = useCreateMachineMutation();
  const [number, setNumber] = useState<string>();

  const handleCreateMachine = () => {
    console.log("creating");
    name && password && number && createMachine({ name, password, number });
  };
  return (
    <div>
      <label>
        name:<input onChange={(e) => setName(e.target.value)}></input>
      </label>
      <br></br>
      <label>
        password:<input onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <label>
        number:<input onChange={(e) => setNumber(e.target.value)}></input>
      </label>
      <button onClick={handleCreateMachine}>submit</button>
      {/* {res.isError ? (
        <>Oh no, there was an error</>
      ) : res.isLoading ? (
        <>Loading...</>
      ) : res.isSuccess ? (
        <>
          Machine:
          {console.log(res.data)}
          <h3>{res.data.name}</h3>
        </>
      ) : null} */}
      {/* <button onClick={() => console.log(res.data)}>get</button> */}
    </div>
  );
};
const EditMachine = () => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const editMachine = async () => {
    console.log("create machine request sent");
    const res = await fetch(
      process.env.REACT_APP_NODE_SERVER_ADDR + "/machine?id/edit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ name, password }),
      }
    );
    const machine = await res.json();
    console.log(machine);
  };
  return (
    <div>
      <label>
        name:<input onChange={(e) => setName(e.target.value)}></input>
      </label>
      <br></br>
      <label>
        password:<input onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <button onClick={editMachine}>submit</button>
    </div>
  );
};
