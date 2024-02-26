import { useEffect, useState } from "react";
import {
  useCreateTaskMutation,
  useEditTaskMutation,
  useGetTaskListQuery,
  useGetTaskQuery,
  useGetUtilityListQuery,
} from "../../State/services";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { AddJob, JobList } from "./components/Jobs";
import styles from "./Task.module.scss";
import { EditUtility, Utility } from "../utility/Utility";
import { Table } from "../components/Table";

export const TaskList = () => {
  let { m_id } = useParams();
  const { data, error, isLoading } = useGetTaskListQuery(m_id);
  const [createTask, setCreateTask] = useState(false);
  return (
    <div>
      TASKS:
      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <div className={styles.TaskList}>
            {data.tasks.map((task) => {
              return <Link to={`Task/${task._id}`}>{task.name}</Link>;
            })}
          </div>
        ) : null}
      </div>
      {/* {createTask && <CreateTask m_id={m_id} />}
      <button onClick={() => setCreateTask(!createTask)}>Add New Task?</button> */}
      <Outlet />
    </div>
  );
};

export const CreateTask = () => {
  let { m_id } = useParams();
  const [name, setName] = useState("defaultTask");
  const [createTask, res] = useCreateTaskMutation();
  const [jobs, setJobs] = useState([]);
  const [taskUtilities, setTaskUtilities] = useState([]);
  const { data, error, isLoading } = useGetUtilityListQuery(m_id);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };
  const submitTask = () => {
    console.log({ name, jobs });
    createTask({ m_id, task: { name, jobs } });
  };
  return (
    <div className={styles.CreateTask}>
      <input
        placeholder="task name"
        onChange={(e) => setName(e.target.value)}
      />
      <br></br>
      <div className={styles.JobUtilContainer}>
        <div>
          {jobs.length > 0 && <JobList jobs={jobs} edit={true} />}
          <AddJob addJob={addJob} />
        </div>
      </div>
      <button onClick={() => submitTask()}>submit Task</button>
    </div>
  );
};

export const Task = () => {
  let { m_id, t_id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { data, error, isLoading } = useGetTaskQuery({ m_id, t_id });
  const task = data;
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <label>
            Name
            <p>{task.name}</p>
          </label>
          {/* {!isEditing && <Table objArr={task.jobs} exclude={["_id"]} />} */}
          {/* <JobList jobs={task.jobs} m_id={m_id} t_id={t_id} /> */}
          <Link
            to="edit"
            state={{ m_id, t_id, task }}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            edit
          </Link>
          <Outlet />
        </>
      ) : null}

      {/* <label>
        Name
        <p>{task.name}</p>
      </label>
      <button onClick={() => setEdit(!edit)}>EditTask</button>
      <button onClick={() => setJobListShown(!jobListShown)}>Show Jobs</button>

      <Link to="edit" state={{ m_id, t_id, task }}>
        edit
      </Link>
      <Outlet />
      {jobListShown && <JobList jobs={task.jobs} m_id={m_id} t_id={t_id} />} */}
      {/* {edit && <EditTask m_id={m_id} t_id={t_id} task={task} />}  */}
    </div>
  );
};

export const EditTask = () => {
  const location = useLocation();
  const { m_id, t_id, task } = location.state;
  const [jobs, setJobs] = useState([]);
  const [name, setName] = useState(null);
  const [addJobShown, setAddJobShown] = useState(false);
  const [editTask] = useEditTaskMutation();

  const addJob = (job) => {
    setJobs([...jobs, job]);
    console.log({ m_id, t_id });
  };
  const editJob = (type, id) => {
    console.log("deleting job");
    console.log(type);
  };
  const saveTask = () => {
    console.log("saving");
    editTask({ m_id, t_id, data: { jobs } });
  };
  return (
    <>
      <JobList
        jobs={task.jobs}
        editJob={(j_id) => {
          editJob(j_id);
        }}
      />

      <button onClick={saveTask}>Save</button>
    </>
  );
};

// {data.tasks.map((task) => {
//   return <Task m_id={m_id} t_id={task._id} key={task._id} />;
// })}
