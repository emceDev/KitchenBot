import { Job } from "../../types/ReceipeTypes";
import { useState } from "react";

// Component renders job, on click it shows its options
export const JobComponent: React.FC<{ job: Job }> = ({ job }) => {
  // console.log(job);
  const [showOptions, setShowDetails] = useState(false);
  return (
    <div onClick={() => setShowDetails(!showOptions)}>
      {job.type}
      {job.source && job.source.contents.name}
      {job.destination && job.destination.name}
      {showOptions && job.options && (
        <div>
          <p>Options:</p>
          <ul>
            {Object.keys(job.options).map((key, index) => (
              <li key={key}>
                {key}: {job.options[key]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
