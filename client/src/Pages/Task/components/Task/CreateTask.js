import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCreateTaskMutation,
  useGetUtilityListQuery,
} from "../../../../State/services";
import styles from "../../Task.module.scss";
import { JobList } from "../Jobs/JobList";
import { AddJob } from "../Jobs/AddJob";

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
    // console.log({ name, jobs });
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
          <AddJob addJob={addJob} jobs={jobs} />
        </div>
      </div>
      <button onClick={() => submitTask()}>submit Task</button>
    </div>
  );
};
