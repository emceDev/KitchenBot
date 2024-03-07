import { useState } from "react";
import { Stove, Job, MixOptions } from "../../types/ReceipeTypes";

type HandleSetOptionsFunction = (key: string, value: any) => void;
const defaultMixingOptions: MixOptions = {
  speed: 2,
  duration: 20,
  textOption: "some text",
};

// this component should be able to invoke AddJob('mix',destination,options)

export const MixJobComponent: React.FC<{
  handleSaveJob: Any;
  choosenStove: Stove;
}> = ({ handleSaveJob, choosenStove }) => {
  const [options, setOptions] = useState<MixOptions>(defaultMixingOptions);
  const handleSetOptions: HandleSetOptionsFunction = (key, value) => {
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
      <button onClick={() => handleSaveJob(choosenStove, "mix", options)}>
        Save Configuration
      </button>
    </div>
  );
};
