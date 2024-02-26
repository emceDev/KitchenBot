import { useEffect, useState } from "react";
import {
  useEditTaskMutation,
  useGetTaskQuery,
} from "../../../../State/services";
import { useParams } from "react-router-dom";
import { JobList } from "../Jobs/JobList";
import { AddJob } from "../Jobs/AddJob";

export const EditTask = () => {
  let { m_id, t_id } = useParams();
  const { data, error, isLoading } = useGetTaskQuery({ m_id, t_id });
  const [jobs, setJobs] = useState([]);
  const [name, setName] = useState("");
  const [addJobShown, setAddJobShown] = useState(false);
  const [editTask] = useEditTaskMutation();

  useEffect(() => {
    if (data) {
      // Set jobs when data changes
      setJobs(data.jobs || []);
    }
  }, [data]);
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
    // console.log(jobs);
    setJobs([...jobs, job]);
    // console.log({ m_id, t_id });
    // console.log(jobs);
  };
  const editJob = (newData) => {
    console.log("OLD DATA:");
    console.log(data.jobs);
    console.log("INCOMING DATA:");
    console.log(newData);
    setJobs(updateStateById(data.jobs, newData));
    console.log("NEW STATE:");
    console.log(jobs);
  };
  const saveTask = () => {
    console.log("saving");
    console.log(jobs);
    editTask({ m_id, t_id, data: { jobs } });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data)
    return (
      <>
        {/* {console.log(data.jobs)} */}
        <JobList
          jobs={jobs}
          editJob={(j_id) => {
            editJob(j_id);
          }}
        />
        {addJobShown && <AddJob addJob={addJob} />}
        <button onClick={() => setAddJobShown(!addJobShown)}>AddJob</button>
        <button onClick={saveTask}>Save</button>
      </>
    );
};
