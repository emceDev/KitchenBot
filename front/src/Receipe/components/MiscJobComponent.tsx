import {
  Stove,
  Container,
  AddJobFunction,
  MixOptions,
  PauseOptions,
  Job,
} from "../../types/ReceipeTypes";
import { useState } from "react";
import { StoveList } from "./StoveList";
import { AdjustJobComponent } from "./AddJobComponents";
import { PauseJobComponent } from "./PauseJobComponent";
import { MixJobComponent } from "./MixJobComponent";
const sampleJobTypes: ("adjust" | "use" | "pause" | "add" | "mix")[] = [
  "pause",
  "adjust",
  "mix",
];

export const MiscJobsComponent: React.FC<{
  sampleJobTypes: ("adjust" | "use" | "pause" | "add" | "mix")[];
  stoves: Stove[];
  containers: Container[];
  addJob: AddJobFunction;
}> = ({ sampleJobTypes, stoves, addJob }) => {
  const [jobType, setJobType] = useState<Job["type"]>();
  const [choosenStove, setChoosenStove] = useState<Stove | null>(null);
  const saveChanges = (stove: Stove) => {
    console.log("save changes on stove");
    addJob(jobType!, stove);
    setChoosenStove(null);
    setJobType(undefined);
  };

  const handleSetJobType = (jobType: Job["type"]) => {
    setJobType(jobType);
  };
  const handleSaveJob = (
    choosenStove: Stove,
    jobType: Job["type"],
    options: Job["options"]
  ) => {
    addJob(jobType, choosenStove, options);
    setJobType(undefined);
    setChoosenStove(null);
  };
  return (
    <div>
      {jobType}
      {jobType === "adjust" && (
        <AdjustJobComponent
          choosenStove={choosenStove!}
          stoves={stoves}
          setChoosenStove={setChoosenStove}
          saveChanges={saveChanges}
        />
      )}
      {jobType === "mix" && choosenStove === null && (
        <StoveList
          stoves={stoves}
          editable={false}
          handleSetDestination={setChoosenStove}
        />
      )}

      {jobType === "mix" && choosenStove && (
        <MixJobComponent
          handleSaveJob={handleSaveJob}
          choosenStove={choosenStove}
        />
      )}
      {jobType === "pause" && <PauseJobComponent addjob={addJob} />}
      {sampleJobTypes.map((jobType, index) => (
        <button
          key={index}
          onClick={() => {
            handleSetJobType(jobType);
          }}
        >
          {jobType}
        </button>
      ))}
    </div>
  );
};
