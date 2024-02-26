import { useEffect, useState } from "react";
import {
  useCreateMachineMutation,
  useGetMachineByIdQuery,
} from "../../State/services";
import { NavLink, Outlet, useParams } from "react-router-dom";
import styles from "./Machine.module.scss";
import { useUtilities } from "../Utility/hooks";
const xm_id = "64eb29f108d0b25211afc486";
export const Machine = () => {
  return (
    <div>
      {/* <CreateMachine /> */}
      <GetMachine />
      {/* <CreateUtility /> */}
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
  const [collapsed, setCollapsed] = useState(true);
  const utilities = useUtilities(m_id);
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
              <h2>Machine:{data.name}</h2>
              <div
                className="navListContainer"
                onMouseOver={() => setCollapsed(false)}
                onMouseLeave={() => setCollapsed(true)}
              >
                <div style={{ position: "absolute" }}>
                  <div>
                    <p>Utilites</p>
                    {!collapsed && (
                      <div className={styles.navList}>
                        {utilities.data.utilities.map((util) => {
                          return (
                            <NavLink
                              to={`/Machine/${m_id}/UtilityList`}
                              key={util._id}
                            >
                              {util.name}
                            </NavLink>
                          );
                        })}
                        <button>
                          <NavLink to={`/Machine/${m_id}/UtilityList`}>
                            Manage Utilites
                          </NavLink>
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <p>Tasks</p>
                    {!collapsed && (
                      <div className={styles.navList}>
                        {data.tasks.map((task) => {
                          return (
                            <NavLink
                              to={`/Machine/${m_id}/Tasks/${task._id}`}
                              key={task._id}
                            >
                              {task.name}
                            </NavLink>
                          );
                        })}
                        <button>
                          <NavLink to={`/Machine/${m_id}/Tasks/create`}>
                            Add task
                          </NavLink>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* <UtilityList m_id="64ecd9b500c295bc7d36e271" />
              <TaskList m_id="64ecd9b500c295bc7d36e271" /> */}
              {/* <button onClick={() => setTaskListShown(!taskListShown)}>
                TaskList
              </button> */}
              {/* <NavLink
                to={`/Machine/${m_id}/UtilityList`}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Utilites
              </NavLink>
              <NavLink
                to={`/Machine/${m_id}/TaskList`}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Tasks
              </NavLink> */}
              {/* <button onClick={() => setUtilityListShown(!taskListShown)}>
                UtilityList
              </button> */}
              {/* <TaskList m_id="64ecd9b500c295bc7d36e271" /> */}
            </div>
            {/* {utilityListShown && (
              <UtilityList m_id="64ecd9b500c295bc7d36e271" />
            )} */}
            {/* <CreateTask m_id="64ecd9b500c295bc7d36e271" /> */}
            {/* {taskListShown && <TaskList m_id="64ecd9b500c295bc7d36e271" />} */}
          </>
        ) : null}
      </div>
      {/* <button onClick={() => console.log(data)}>log machine data</button> */}
      <Outlet />
    </div>
  );
};
const CreateMachine = () => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [createMachine, res] = useCreateMachineMutation();
  return (
    <div>
      <label>
        name:<input onChange={(e) => setName(e.target.value)}></input>
      </label>
      <br></br>
      <label>
        password:<input onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <button onClick={() => createMachine({ name, password })}>submit</button>
      {res.isError ? (
        <>Oh no, there was an error</>
      ) : res.isLoading ? (
        <>Loading...</>
      ) : res.isSuccess ? (
        <>
          Machine:
          {console.log(res.data)}
          <h3>{res.data.name}</h3>
        </>
      ) : null}
      <button onClick={() => console.log(res.data)}>get</button>
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

// const GetMachine = ()=>{
//     const [name, setName] = useState(null)
//     const [pass,setPass] = useState(null)
//     useEffect(() => {
//         async function getMachine(){const machine = await fetch(process.env.REACT_APP_NODE_SERVER_ADDR+'/machine/?id:64ea02fe42d6f68953b5d8a2',{
//             method:'GET',
//             headers: {
//                 "Content-Type": "application/json",
//               },
//             mode: "cors",
//         })
//         console.log(machine)}
//         getMachine()
//     }, [])

// }
