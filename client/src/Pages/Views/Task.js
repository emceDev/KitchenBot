import { useEffect, useState } from "react";
import {
  useCreateTaskMutation,
  useEditTaskMutation,
  useGetTaskListQuery,
  useGetTaskQuery,
  useGetUtilityListQuery,
} from "../../State/services";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { AddJob, JobList } from "../components/Jobs/Jobs";
import styles from "./Task.module.scss";
import { EditUtility, Utility } from "./Utility";
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
          <JobList jobs={task.jobs} m_id={m_id} t_id={t_id} />
          <Link
            to="edit"
            state={{ m_id, t_id, task }}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Modify Task
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
  let { m_id, t_id } = useParams();
  const { data, error, isLoading } = useGetTaskQuery({ m_id, t_id });
  const task = data;
  const [jobs, setJobs] = useState(task.jobs);
  const [name, setName] = useState(task.name);
  const [addJobShown, setAddJobShown] = useState(false);
  const [editTask] = useEditTaskMutation();
  const updateStateById = (oldData, incomingData) => {
    // Iterate over the oldData array
    const updatedData = oldData.map((item) => {
      // Check if the item's _id matches the incomingData id
      if (item._id === incomingData.id) {
        // If matched, update the item with incomingData
        return {
          ...item, // Keep existing properties
          type: incomingData.type,
          destination: incomingData.destination,
          source: incomingData.source,
          // Add other properties to update here
        };
      } else {
        // If not matched, return the original item
        return item;
      }
    });

    // Return the updated data
    return updatedData;
  };
  const addJob = (job) => {
    setJobs([...jobs, job]);
    console.log({ m_id, t_id });
  };
  const editJob = (newData) => {
    console.log("OLD DATA:");
    console.log(task.jobs);
    console.log("INCOMING DATA:");
    console.log(newData);
    setJobs(updateStateById(task.jobs, newData));
    console.log("NEW STATE:");
    console.log(jobs);
  };
  const saveTask = () => {
    console.log("saving");
    console.log(jobs);
    // editTask({ m_id, t_id, data: { jobs } });
  };
  {
    return (
      data && (
        <>
          {console.log(data)}
          <JobList
            jobs={task.jobs}
            editJob={(j_id) => {
              editJob(j_id);
            }}
          />

          <button onClick={saveTask}>Save</button>
        </>
      )
    );
  }
};

// {data.tasks.map((task) => {
//   return <Task m_id={m_id} t_id={task._id} key={task._id} />;
// })}
