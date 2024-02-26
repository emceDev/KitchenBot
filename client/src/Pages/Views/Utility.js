import { useEffect, useState } from "react";
import {
  useCreateUtilityMutation,
  useEditUtilityMutation,
  useGetUtilityListQuery,
} from "../../State/services";
import { useParams } from "react-router-dom";
import { Table } from "../components/Table";

export const Utility = ({ utility }) => {
  const [optionsShown, setOptionsShown] = useState(false);
  return (
    <div>
      {console.log(utility)}
      <div>
        <label>
          Name:
          {utility.name}
        </label>
        <label>
          Type:
          {utility.type}
        </label>
        <label>
          Position:
          {utility.position}
        </label>
      </div>
      {/* {utility.type === "container" ? utility.contents.name : utility.name}, */}
      {/* {optionsShown && <UtilityOptions options={utility.options} />} */}
      {/* <button onClick={() => setOptionsShown(!optionsShown)}>Options</button> */}
    </div>
  );
};
