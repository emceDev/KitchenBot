import { useParams } from "react-router-dom";
import { JobListItem, JobListItemDetails } from "./components/JobListItem";
import { useGetReceipeDetailsQuery } from "../state/apiSlice";
import { useEffect, useState } from "react";
import { Job } from "../types/ReceipeTypes";
export const ReceipeDetails = ({}) => {
  // simulated fetch for

  let { r_id, m_id } = useParams();
  const { data, error, isLoading } = useGetReceipeDetailsQuery({ m_id, r_id });
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    console.log(data);
    data && setJobs(data.jobs);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>An error occured...</div>;
  } else if (data) {
    return (
      <div>
        <div>Receipe name:{data.name}</div>
        <div>Status:{data.status}</div>
        {jobs &&
          jobs.map((job: Job, index) => (
            <JobListItemDetails
              job={job}
              index={index}
              key={job.jobType + index}
            />
          ))}
      </div>
    );
  }
};
