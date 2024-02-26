import { useUtilities } from "../../../Utility/hooks";

export const useAviableJobTypes = () => {
  const { data, error, isLoading } = useUtilities();
  const newAviaJobArr = [];
  data &&
    data.utilities.filter(
      (x) =>
        !newAviaJobArr.includes(x.jobType) &&
        !(x.jobType === "stove") &&
        newAviaJobArr.push(x.jobType)
    );
  return newAviaJobArr;
};
