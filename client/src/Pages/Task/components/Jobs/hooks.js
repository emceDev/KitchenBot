import { useUtilities } from "../../../Utility/hooks";

// exclusion of grabber being edited for now
// in the future there will be possibilites to do so via app
export const useAviableJobTypes = () => {
  const { data, error, isLoading } = useUtilities();
  const newAviaJobArr = ["wait"];
  data &&
    data.utilities.filter(
      (x) =>
        x.type !== "grabber" &&
        !newAviaJobArr.includes(x.jobType) &&
        !(x.jobType === "stove") &&
        newAviaJobArr.push(x.jobType)
    );
  return newAviaJobArr;
};
