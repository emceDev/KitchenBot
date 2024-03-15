import { Job, handleJobEditFunction } from "../../../types/ReceipeTypes";
import { useEffect, useState } from "react";

export const JobPauseDetails: React.FC<{ job: Job }> = ({ job }) => {
  return <div>Duration:{job.options!.duration}</div>;
};
export const JobPauseEditDetails: React.FC<{
  job: Job;
  handleEditJob: handleJobEditFunction;
}> = ({ job, handleEditJob }) => {
  const [editedJob, setEditedJob] = useState<Job>(job);
  const handleChange = (option: string, value: any) => {
    // console.log(option, value);
    const newJob = { ...editedJob };
    if (newJob.options) {
      newJob.options[option] = value;
      setEditedJob(newJob);
    } else {
      console.log("initializing options");
      setEditedJob(newJob);
    }
  };

  return (
    <div>
      Change Duration:
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
export const JobPauseCreate: React.FC<{
  handleCreateJob: any;
}> = ({ handleCreateJob }) => {
  const [pause, setPause] = useState<number>(0);
  return (
    <div>
      <label>
        duration:
        <input
          type="number"
          value={pause || ""} // Convert NaN to an empty string
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setPause(isNaN(value) ? 0 : value); // Use 0 if parsing fails
          }}
        />
      </label>
      <button
        onClick={() =>
          handleCreateJob({
            jobType: "pause",
            options: {
              duration: pause,
              description: "casual pause",
            },
          })
        }
      >
        save
      </button>
    </div>
  );
};

export const JobPauseEdit: React.FC<{
  handleEditJob: any;
  job?: Job;
}> = ({ handleEditJob, job }) => {
  const [pause, setPause] = useState<number>(0);
  useEffect(() => {
    if (job && job.options) {
      setPause(parseInt(job.options!.duration));
    }
  }, [job]);

  return (
    <div>
      <label>
        duration:
        <input
          type="number"
          value={pause || ""} // Convert NaN to an empty string
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setPause(isNaN(value) ? 0 : value); // Use 0 if parsing fails
          }}
        />
      </label>
      <button
        onClick={() =>
          handleEditJob({
            jobType: "pause",
            options: {
              duration: pause,
              description: "casual pause",
            },
          })
        }
      >
        save
      </button>
    </div>
  );
};
