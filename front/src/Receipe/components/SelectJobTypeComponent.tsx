import useConfigureJob from "../hooks/configureJob";
import useJobs from "../hooks/hooks";

const sampleJobTypes: ("adjust" | "use" | "pause" | "add" | "mix")[] = [
  "pause",
  "adjust",
  "mix",
];

export const SelectJobTypeComponent = () => {
  const { handleSetJobType } = useConfigureJob();
  return (
    <>
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
    </>
  );
};
