import { useState } from "react";
import {
  AddJobFunction,
  Container,
  Job,
  MixOptions,
  Stove,
  Tool,
} from "../../types/ReceipeTypes";
const defaultMixingOptions: MixOptions = {
  speed: 2,
  duration: 20,
  textOption: "some text",
};

const useConfigureJob = () => {
  const [container, setContainer] = useState<Container | Tool>();
  const [selectedJobType, setSelectedJobType] = useState<Job["type"]>();
  const [stove, setStove] = useState<Stove>();
  const [options, setOptions] = useState<MixOptions>();
  const [stovesShown, setStovesShown] = useState(false);
  const [containersShown, setContainersShown] = useState(false);
  // this will set up real job object and will add itself to the job list on case
  const addJob: Any = () => {
    console.log("add job in job heh");
  };
  const handleSetJobType = (type: Job["type"]) => {
    console.log("setting job type", type);

    setSelectedJobType(type);
  };
  type HandleSetOptionsFunction = (key: string, value: any) => void;

  const handleSetOptions: HandleSetOptionsFunction = (key, value) => {
    console.log("set options", options);
    setOptions((prevOptions) => {
      if (!prevOptions) return prevOptions; // Return undefined if prevOptions is undefined
      return {
        ...prevOptions,
        [key]: value,
      };
    });
    setOptions(options);
  };
  const handleAddJob = () => {
    console.log("adding job");
  };
  return {
    container,
    selectedJobType,
    stove,
    options,
    addJob,
    handleSetJobType,
    handleSetOptions,
    handleAddJob,
  };
};

export default useConfigureJob;
