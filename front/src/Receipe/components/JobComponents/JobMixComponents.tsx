import {
  MixOptions,
  Job,
  Stove,
  handleJobEditFunction,
} from "../../../types/ReceipeTypes";
import { useEffect, useState } from "react";
import { StoveList } from "../stoveComponents/StoveList";
export const JobMixCreate: React.FC<{
  stoves: Stove[];
  handleCreateJob: any;
}> = ({ stoves, handleCreateJob }) => {
  const [selectedStove, setSelectedStove] = useState<Stove>();
  const handleSaveMixerOptions = (options: MixOptions) => {
    selectedStove &&
      handleCreateJob({
        jobType: "mix",
        stove: selectedStove,
        options: options,
      });
  };
  return (
    <div>
      {!selectedStove && (
        <StoveList handleSetStove={setSelectedStove} stoves={stoves} />
      )}
      {selectedStove && <MixerOptions saveOptions={handleSaveMixerOptions} />}
    </div>
  );
};

const defaultMixingOptions: MixOptions = {
  speed: 2,
  duration: 20,
  textOption: "some text",
};

type SaveOptionsFunction = (options: MixOptions) => void;

const MixerOptions: React.FC<{
  saveOptions: SaveOptionsFunction;
  mixOptions?: MixOptions;
}> = ({ saveOptions, mixOptions }) => {
  const [options, setOptions] = useState<MixOptions>(
    mixOptions ? mixOptions : defaultMixingOptions
  );
  const handleSetOptions = (key, value) => {
    setOptions((prevOptions) => {
      if (!prevOptions) return prevOptions; // Return undefined if prevOptions is undefined
      return {
        ...prevOptions,
        [key]: value,
      };
    });
  };
  return (
    <div>
      {Object.keys(options).map((option) => (
        <div key={option}>
          <label>
            {option}
            <input
              type={options["key"] ? "number" : "text"}
              key={option}
              data-key={option}
              value={options[option]}
              onChange={(e) => handleSetOptions(option, e.target.value)}
            />
          </label>
        </div>
      ))}
      <button onClick={() => saveOptions(options)}>save options</button>
    </div>
  );
};
export const JobMixDetails: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div>
      Mixing: {job.stove && `${job.stove.number}.${job.stove.name}`}
      {job.options &&
        Object.keys(job.options).map((option, index) => (
          <div key={option + index}>
            <label>
              {option}:{job.options![option]}
            </label>
          </div>
        ))}
    </div>
  );
};
export const JobMixEditDetails: React.FC<{
  job: Job;
  handleEditJob: handleJobEditFunction;
}> = ({ job, handleEditJob }) => {
  const [editedJob, setEditedJob] = useState<Job>(job);

  const handleChange = (option: string, value: any) => {
    // console.log(option, value);
    let newJob = { ...editedJob };
    console.log("editing:", job);
    if (newJob.options) {
      console.log("here");
      console.log("VALUE:", newJob.options["speed"]);
      newJob.options[option] = value;
      setEditedJob(newJob);
    } else {
      console.log("initializing options");
      setEditedJob(newJob);
    }
  };
  useEffect(() => {
    console.log("mix job initialized", job);
    console.log("is mix object frozen?", Object.isFrozen(job));
  }, [job]);

  return (
    <div>
      {editedJob.options &&
        Object.keys(editedJob.options).map((option) => (
          <label key={option}>
            {option}
            <input
              placeholder={
                editedJob.options ? editedJob.options[option].toString() : "0"
              }
              value={editedJob.options ? editedJob.options[option] : 0}
              onChange={(e) => handleChange(option, e.target.value)}
            />
          </label>
        ))}
      <button
        onClick={() => {
          handleEditJob(editedJob);
        }}
      >
        save
      </button>
    </div>
  );
};

// export const JobMixEditDetails: React.FC<{
//   job: Job;
//   handleEditJob: handleJobEditFunction;
// }> = ({ job, handleEditJob }) => {
//   const [editedJob, setEditedJob] = useState<Job>(job);

//   const handleChange = (option: string, value: any) => {
//     // console.log(option, value);
//     const newJob = { ...editedJob };
//     console.log("editing:", job, newJob);
//     if (newJob.options) {
//       newJob.options[option] = value;
//       setEditedJob(newJob);
//     } else {
//       console.log("initializing options");
//       setEditedJob(newJob);
//     }
//   };
//   return (
//     <div>
//       {editedJob.options &&
//         Object.keys(editedJob.options).map((option) => (
//           <label key={option}>
//             {option}
//             <input
//               placeholder={
//                 editedJob.options ? editedJob.options[option].toString() : "0"
//               }
//               value={editedJob.options ? editedJob.options[option] : 0}
//               onChange={(e) => handleChange(option, e.target.value)}
//             />
//           </label>
//         ))}
//       <button
//         onClick={() => {
//           handleEditJob(editedJob);
//         }}
//       >
//         save
//       </button>
//     </div>
//   );
// };
