import { Job, Stove, handleJobEditFunction } from "../../../types/ReceipeTypes";
import { useState } from "react";
import { StoveList } from "../stoveComponents/StoveList";
import { StoveComponentAdjust } from "../stoveComponents/StoveComponent";
export const JobAdjustDetails: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div>
      Adjusting: {job.stove!.number}.{job.stove!.name}
      {job.options &&
        Object.keys(job.options).map((option) => (
          <div key={option}>
            <label>
              {option}.{job.options![option]}
            </label>
          </div>
        ))}
    </div>
  );
};
export const JobAdjustCreate: React.FC<{
  stoves: Stove[];
  handleCreateJob: any;
}> = ({ stoves, handleCreateJob }) => {
  const [choosenStove, setChoosenStove] = useState<Stove>();
  const handleAdjustStove = (stove: Stove, options: Stove["options"]) => {
    console.log(options);

    handleCreateJob({ jobType: "adjust", stove: stove, options: options });
  };
  return (
    <div>
      {!choosenStove && (
        <StoveList stoves={stoves} handleSetStove={setChoosenStove} />
      )}
      {choosenStove && (
        <StoveComponentAdjust
          handleAdjustStove={handleAdjustStove}
          stove={choosenStove}
        />
      )}
    </div>
  );
};
export const JobAdjustEditDetails: React.FC<{
  stove: Stove;
  handleAdjustStove: handleJobEditFunction;
}> = ({ stove, handleAdjustStove }) => {
  const [newStove, setNewStove] = useState(stove);
  const [options, setOptions] = useState<Stove["options"]>(stove.options);
  const handleInputChange = (key: string, value: string | number) => {
    const updatedOptions = {
      ...options,
      [key]: value,
    };

    setOptions(updatedOptions);

    const updatedStove = {
      ...newStove,
      options: updatedOptions,
    };

    setNewStove(updatedStove);
  };
  // useEffect(() => {
  //   if (stove) {
  //     console.log("adjust:", stove);
  //     setNewStove()
  //   }
  // }, [stove]);

  return (
    <div>
      Adjusting stovex:
      {stove!.number} {stove!.name}
      {stove &&
        Object.keys(stove.options).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              id={key}
              type="text"
              value={options[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          </div>
        ))}
      <button
        onClick={() =>
          handleAdjustStove({
            jobType: "adjust",
            stove: newStove,
            options: options,
          })
        }
      >
        save
      </button>
    </div>
  );
};
export const JobAdjustEdit: React.FC<{
  stove: Stove;
  handleAdjustStove: handleJobEditFunction;
}> = ({ stove, handleAdjustStove }) => {
  console.log("adjust:", stove);
  const [newStove, setNewStove] = useState(stove);
  const [options, setOptions] = useState<Stove["options"]>(stove.options);
  const handleInputChange = (key: string, value: string | number) => {
    const updatedOptions = {
      ...options,
      [key]: value,
    };

    setOptions(updatedOptions);

    const updatedStove = {
      ...newStove,
      options: updatedOptions,
    };

    setNewStove(updatedStove);
  };
  return (
    <div>
      Adjusting stove:
      {stove!.number} {stove!.name}
      {stove &&
        Object.keys(stove.options).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              id={key}
              type="text"
              value={options[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          </div>
        ))}
      <button
        onClick={() =>
          handleAdjustStove({
            jobType: "adjust",
            stove: newStove,
            options: options,
          })
        }
      >
        save
      </button>
    </div>
  );
};
