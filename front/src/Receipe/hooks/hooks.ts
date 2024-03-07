import { useState } from "react";
import {
  AddJobFunction,
  Container,
  Job,
  MixOptions,
  Stove,
  Tool,
} from "../../types/ReceipeTypes";

const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob: AddJobFunction = (type, destination, options) => {
    console.log("addjob", type, destination, options);
    const job = { type, destination, options }; // Assuming 'source' is not available here
    // Additional logic for handling source and grayedContainers

    setJobs((prevJobs) => [...prevJobs, job]); // Add the new job to the existing jobs list
    // Additional logic if needed
  };
  const selectJobType = (type: Job["type"]) => {
    setSelectedJobType(type);
    console.log("selecting type:", type);
  };
  return { jobs, addJob, selectJobType };
};

export default useJobs;
