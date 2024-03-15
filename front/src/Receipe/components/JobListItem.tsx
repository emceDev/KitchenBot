import {
  Job,
  Container,
  Stove,
  handleEditJobFunction,
  handleJobEditFunction,
} from "../../types/ReceipeTypes";
import React, { useEffect, useState } from "react";
import {
  JobAddDetails,
  JobAddEditDetails,
} from "./JobComponents/JobAddComponents";
import {
  JobPauseDetails,
  JobPauseEdit,
  JobPauseEditDetails,
} from "./JobComponents/JobPauseComponents";
import {
  JobAdjustDetails,
  JobAdjustEdit,
  JobAdjustEditDetails,
} from "./JobComponents/JobAdjustComponents";
import {
  JobMixDetails,
  JobMixEditDetails,
} from "./JobComponents/JobMixComponents";

export const JobListItem: React.FC<{
  job: Job;
  handleMoveItem: any;
  handleEditJob: handleEditJobFunction;
  index: number;
  stoves: Stove[];
  grayedContainers: Container[];
  containers: Container[];
}> = ({
  job,
  handleMoveItem,
  handleEditJob,
  index,
  stoves,
  grayedContainers,
  containers,
}) => {
  const [editDetails, setEditDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleJobEdit: handleJobEditFunction = (jobData: Job) => {
    console.log("job edited");
    handleEditJob(index, jobData);
  };
  useEffect(() => {
    console.log("is job frozen in joblist item?", Object.isFrozen(job));
  }, [job]);
  return (
    <div
      onClick={() => setShowDetails(true)}
      onMouseLeave={() => {
        setShowDetails(false);
        setEditDetails(false);
      }}
      style={{ border: "1px solid cyan" }}
    >
      {job.jobType}
      {job.container && job.container.contents.name}
      {job.jobType === "add" && !editDetails && showDetails && (
        <JobAddDetails job={job} />
      )}
      {job.jobType === "add" && editDetails && (
        <JobAddEditDetails
          containers={containers}
          grayedContainers={grayedContainers}
          handleJobAdd={handleJobEdit}
          stoves={stoves}
        />
      )}
      {job.jobType === "pause" && !editDetails && showDetails && (
        <JobPauseDetails job={job} />
      )}
      {job.jobType === "pause" && editDetails && (
        <JobPauseEditDetails job={job} handleEditJob={handleJobEdit} />
      )}
      {showDetails && !editDetails && job.stove && job.jobType === "adjust" && (
        <JobAdjustDetails job={job} />
      )}
      {editDetails && job.stove && job.jobType === "adjust" && (
        <JobAdjustEditDetails
          stove={job.stove}
          handleAdjustStove={handleJobEdit}
        />
      )}
      {job.jobType === "mix" && showDetails && !editDetails && (
        <JobMixDetails job={job} />
      )}
      {job.jobType === "mix" && editDetails && (
        <JobMixEditDetails job={job} handleEditJob={handleJobEdit} />
      )}
      {showDetails && (
        <>
          <button onClick={() => handleMoveItem(index, true)}>Up</button>
          <button onClick={() => handleMoveItem(index, false)}>Down</button>
          <button onClick={() => setEditDetails(!editDetails)}>Edit</button>
          {/* <button onClick={() => handleRemoveItem(index, false)}>Delete</button> */}
        </>
      )}
    </div>
  );
};

export const JobListItemDetails: React.FC<{
  job: Job;
  index: number;
}> = ({ job }) => {
  const [editDetails, setEditDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      onClick={() => setShowDetails(true)}
      onMouseLeave={() => {
        setShowDetails(false);
        setEditDetails(false);
      }}
      style={{ border: "1px solid cyan" }}
    >
      {job.jobType}
      {job.container && job.container.contents.name}x
      {job.jobType === "add" && showDetails && <JobAddDetails job={job} />}
      {job.jobType === "pause" && !editDetails && showDetails && (
        <JobPauseDetails job={job} />
      )}
      {showDetails && job.stove && job.jobType === "adjust" && (
        <JobAdjustDetails job={job} />
      )}
      {job.jobType === "mix" && showDetails && !editDetails && (
        <JobMixDetails job={job} />
      )}
    </div>
  );
};

export const JobListItemEdit: React.FC<{
  job: Job;
  handleMoveItem: any;
  handleEditJob: handleEditJobFunction;
  index: number;
  stoves: Stove[];
  grayedContainers: Container[];
  containers: Container[];
}> = ({
  job,
  handleMoveItem,
  handleEditJob,
  index,
  stoves,
  grayedContainers,
  containers,
}) => {
  const [editDetails, setEditDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleJobEdit: handleJobEditFunction = (jobData: Job) => {
    console.log("job edited");
    // console.log(jobData, index);
    handleEditJob(index, jobData);
  };
  useEffect(() => {
    console.log("initialized joblistItemEdit");
    console.log(job, stoves, containers);
    console.log(job.stove);
  }, []);

  return (
    <div
      onClick={() => setShowDetails(true)}
      onMouseLeave={() => {
        setShowDetails(false);
        setEditDetails(false);
      }}
      style={{ border: "1px solid cyan" }}
    >
      {job.jobType}
      {job.container && job.container.contents.name}
      {job.jobType === "add" && !editDetails && showDetails && (
        <JobAddDetails job={job} />
      )}
      {job.jobType === "add" && editDetails && (
        <JobAddEditDetails
          containers={containers}
          grayedContainers={grayedContainers}
          handleJobAdd={handleJobEdit}
          stoves={stoves}
        />
      )}
      {job.jobType === "pause" && !editDetails && showDetails && (
        <JobPauseDetails job={job} />
      )}
      {job.jobType === "pause" && editDetails && (
        <JobPauseEdit job={job} handleEditJob={handleJobEdit} />
      )}
      {showDetails && !editDetails && job.stove && job.jobType === "adjust" && (
        <JobAdjustDetails job={job} />
      )}
      {editDetails && job.stove && job.jobType === "adjust" && (
        <JobAdjustEdit stove={job.stove} handleAdjustStove={handleJobEdit} />
      )}
      {job.jobType === "mix" && showDetails && !editDetails && (
        <JobMixDetails job={job} />
      )}
      {job.jobType === "mix" && editDetails && (
        <JobMixEditDetails job={job} handleEditJob={handleJobEdit} />
      )}
      {showDetails && (
        <>
          <button onClick={() => handleMoveItem(index, true)}>Up</button>
          <button onClick={() => handleMoveItem(index, false)}>Down</button>
          <button onClick={() => setEditDetails(!editDetails)}>Edit</button>
          {/* <button onClick={() => handleRemoveItem(index, false)}>Delete</button> */}
        </>
      )}
    </div>
  );
};
