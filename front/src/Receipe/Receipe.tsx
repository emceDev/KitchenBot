import React, { useState } from "react";
// import {dummyContainers} from '../Container/dummyContainers.js'
import { dummyContainers, dummyStoves } from "./dummyData";
import {
  MixOptions,
  Job,
  Stove,
  Container,
  Tool,
  PauseOptions,
  AddJobFunction,
} from "../types/ReceipeTypes";
import { JobComponent } from "./components/JobComponent";
import { ContainersList } from "./components/ContainerList";
import { StoveList } from "./components/StoveList";
import { MiscJobsComponent } from "./components/MiscJobComponent";
const sampleJobTypes: ("adjust" | "use" | "pause" | "add" | "mix")[] = [
  "pause",
  "adjust",
  "mix",
];
export const RecipeComponent: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [destination, setDestination] = useState<Stove>();
  const [source, setSource] = useState<Container | Tool>();
  const [containers] = useState<Container[]>(dummyContainers);
  const [grayedContainers, setGrayedContainers] = useState<Container[]>([]);
  const [stoves] = useState<Stove[]>(dummyStoves);
  const [showContainers, setShowContainers] = useState(true);
  const [showStoves, setShowStoves] = useState(false);
  // type: "add" | "mix" | "adjust" | "pause",
  // destination?: Stove,
  // options?: Job["options"]
  const addJob: AddJobFunction = (type, destination, options) => {
    console.log("addjob", type, destination, options);
    const job: Job = { type, destination, source, options };
    //if source type container remove it from available containers
    job.source && console.log(job.source.type);
    // console.log(job)

    type === "add" &&
      job.source &&
      job.source.type === "container" &&
      setGrayedContainers((prevGrayedContainers) => [
        ...prevGrayedContainers,
        source as Container, // Asserting source to Container type
      ]);
    setSource(undefined);
    setJobs([...jobs, job]);
  };
  const handleSetSource = (container: Container) => {
    // console.log('adding soruce')
    // console.log(container);
    setSource(container);
    setShowContainers(false);
    setShowStoves(true);
  };
  const handleSetDestination = async (stove: Stove) => {
    // console.log('handling destination (stove)');
    // console.log(stove);
    // setDestination(stove)
    setDestination(stove);
    addJob("add", stove);
    setShowContainers(true);
    setShowStoves(false);
  };
  return (
    <div>
      Receipe:
      {/* listing jobs */}
      {jobs && jobs.map((job) => <JobComponent job={job} />)}
      {/* listing containers */}
      {showContainers && containers && (
        <ContainersList
          containers={containers}
          handleSetSource={handleSetSource}
          grayedContainers={grayedContainers}
        />
      )}
      {/* listing stoves */}
      {showStoves && stoves && (
        <StoveList
          stoves={stoves}
          handleSetDestination={handleSetDestination}
          editable={false}
        />
      )}
      {/* {rest of the jobs Mix, adjust, pause} */}
      <div>
        <MiscJobsComponent
          sampleJobTypes={sampleJobTypes}
          stoves={stoves}
          containers={containers}
          addJob={addJob}
        />
      </div>
    </div>
  );
};
