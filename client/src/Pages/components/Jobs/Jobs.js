import { useEffect, useState } from "react";
import styles from "./Jobs.module.scss";
import { useUtilities } from "../../Views/Utility";
import { Table } from "../Table";
const useAviableJobTypes = () => {
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

const Job = ({ job }) => {
  return (
    <div>
      type : {job.type}
      Source: {job.source.name}
      destination :{job.destination.name}
    </div>
  );
};
