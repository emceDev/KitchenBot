import React, { useState, useEffect } from "react";
// import {dummyContainers} from '../Container/dummyContainers.js'
import { dummyStoves } from "./dummyData";
import {
  Job,
  Stove,
  Container,
  handleEditJobFunction,
  Receipe,
} from "../types/ReceipeTypes";

import { ContainerForm } from "../Container/Container";
import {
  useGetReceipeDetailsQuery,
  useGetRegisteredContainersQuery,
  useRegisterSingleContainerMutation,
  useUpdateReceipeMutation,
} from "../state/apiSlice";
import { useParams } from "react-router-dom";
import { JobAddCreate } from "./components/JobComponents/JobAddComponents";
import { JobAdjustCreate } from "./components/JobComponents/JobAdjustComponents";
import { JobMixCreate } from "./components/JobComponents/JobMixComponents";
import { JobPauseCreate } from "./components/JobComponents/JobPauseComponents";
import { JobListItem } from "./components/JobListItem";

const sampleJobTypes: ("adjust" | "use" | "pause" | "add" | "mix")[] = [
  "add",
  "pause",
  "adjust",
  "mix",
];

export const ReceipeEdit: React.FC = () => {
  const { r_id, m_id } = useParams();
  const registeredContainersReq = useGetRegisteredContainersQuery(m_id);
  const receipeReq = useGetReceipeDetailsQuery({ r_id, m_id });
  const [registerContainer, registerContainerResult] =
    useRegisterSingleContainerMutation({
      fixedCacheKey: "register-container",
    });
  const [name, setName] = useState<string>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobType, setJobType] = useState<Job["jobType"] | undefined>();
  const [containers, setContainers] = useState<Container[]>([]);
  const [grayedContainers, setGrayedContainers] = useState<Container[]>([]);
  const [stoves, setStoves] = useState<Stove[]>(dummyStoves);
  const [showAddContainer, setShowAddContainer] = useState(false);
  // const [createReceipe, newReceipe] = useCreateReceipeMutation();
  const [updateReceipe] = useUpdateReceipeMutation();
  const handleMoveItem = (index: number, direction: boolean) => {
    const dir = direction ? -1 : 1;
    const newPosition = index + dir;

    if (newPosition < 0 || newPosition >= jobs.length) {
      // Index out of bounds, cannot move item
      return;
    }

    // Create a copy of the jobs array
    const newJobs = [...jobs];

    // Swap the positions of the items
    [newJobs[index], newJobs[newPosition]] = [
      newJobs[newPosition],
      newJobs[index],
    ];

    // Update the state with the new array
    setJobs(newJobs);
  };
  const handleSaveReceipe = () => {
    if (name) {
      const receipe: Receipe = {
        containers: containers,
        stoves: stoves,
        name: name,
        jobs: jobs,
        status: "created",
      };
      updateReceipe({ r_id, m_id, receipeData: receipe });
      console.log("saving receipe", receipe);
    }
  };
  const handleAddContainer = (container: Container) => {
    console.log("container add from receipe");
    setContainers([...containers, container]);
    setShowAddContainer(false);
    container && m_id && registerContainer({ body: container, m_id: m_id });
    console.log(registerContainerResult);
    // register containers to db and send them back with ids and refetch the registered containers
  };
  const handleJobAdd = (job: Job) => {
    // console.log("adding job: job to receipe");
    setGrayedContainers((prevGrayedContainers) => [
      ...prevGrayedContainers,
      job.container as Container, // Asserting source to Container type
    ]);
    setJobs([...jobs, job]);
    setJobType(undefined);
  };
  const handleJobMix = (job: Job) => {
    setJobs([...jobs, job]);
  };
  const handleJobAdjust = (job: Job) => {
    const newStoves = stoves
      .map((s) => (s.number === job.stove!.number ? job.stove : s))
      .filter((s: Stove | undefined) => s !== undefined) as Stove[];
    setJobs([...jobs, job]);
    setStoves(newStoves);
    setJobType(undefined);
  };
  const handleJobPause = (job: Job) => {
    setJobs([...jobs, job]);
  };
  // replace job with given index

  const handleEditJob: handleEditJobFunction = (i, job) => {
    console.log("editing", i);
    const updatedJobs = jobs.map((j, index) => (index === i ? job : j));
    if (job.jobType === "add") {
      const newGrayedContainers = grayedContainers
        .map((c: Container) =>
          c.number === jobs[i].container!.number ? job.container : c
        )
        .filter((c: Container | undefined) => c !== undefined) as Container[];
      newGrayedContainers && setGrayedContainers(newGrayedContainers);
    }
    setJobs(updatedJobs);
    if (job.stove) {
      const stove = job.stove;
      const newStoves = stoves.map((s) =>
        s.number === stove.number ? stove : s
      );
      setStoves(newStoves);
    }
  };
  useEffect(() => {
    if (registeredContainersReq.data) {
      // Update containers state with fetched data
      setContainers(registeredContainersReq.data.registeredContainers);
      console.log("registered containers");
    }
  }, [registeredContainersReq]);
  useEffect(() => {
    if (receipeReq.data) {
      const { name, jobs, stoves, containers } = JSON.parse(
        JSON.stringify(receipeReq.data)
      );

      setName(name);
      setGrayedContainers([...containers]);
      setJobs(jobs);
      setStoves([...stoves]);

      console.log("receipe fetched:", receipeReq.data);
    }
  }, [receipeReq]);
  useEffect(() => {
    console.log("are jobs fronzen in receipe edit?", Object.isFrozen(jobs[0]));
  }, [jobs]);

  return (
    <div>
      <label>
        Receipe name:
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder={name}
        ></input>
      </label>
      {/* job list  */}
      {jobs &&
        jobs.map((job, index) => (
          <JobListItem
            key={job.jobType + index}
            job={job}
            index={index}
            handleMoveItem={handleMoveItem}
            stoves={stoves}
            containers={containers}
            grayedContainers={grayedContainers}
            handleEditJob={handleEditJob}
          />
        ))}
      {jobType === "add" && containers && (
        <JobAddCreate
          handleCreateJob={handleJobAdd}
          stoves={stoves}
          containers={containers}
          grayedContainers={grayedContainers}
        />
      )}
      {jobType === "adjust" && (
        <JobAdjustCreate stoves={stoves} handleCreateJob={handleJobAdjust} />
      )}
      {jobType === "mix" && (
        <JobMixCreate stoves={stoves} handleCreateJob={handleJobMix} />
      )}
      {jobType === "pause" && (
        <JobPauseCreate handleCreateJob={handleJobPause} />
      )}
      {sampleJobTypes.map((jobType, index) => (
        <button
          key={index}
          onClick={() => {
            setJobType(jobType);
          }}
        >
          {jobType}
        </button>
      ))}
      {showAddContainer ? (
        <ContainerForm
          container={{
            type: "container",
            contents: { contentsType: "", name: "", weight: 0 },
            number: "",
          }}
          onSubmit={handleAddContainer}
        />
      ) : (
        <button onClick={() => setShowAddContainer(true)}>add container</button>
      )}
      <button onClick={handleSaveReceipe}>Save Receipe</button>
    </div>
  );
};
