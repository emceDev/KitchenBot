import { useState } from "react";
import { Stove, SetStoveFunction } from "../../../types/ReceipeTypes";
import { StoveComponent, StoveComponentEdit } from "./StoveComponent";

// accepts list of stoves, component is dumb for now, but later on it may be improved to do more
export const StoveList: React.FC<{
  stoves: Stove[];
  handleSetStove: SetStoveFunction;
}> = ({ stoves, handleSetStove }) => {
  return (
    <div>
      {stoves.map((stove: Stove, index) => (
        <StoveComponent
          key={`${stove.number}index`}
          handleSetStove={handleSetStove}
          stove={stove}
        />
      ))}
    </div>
  );
};
export const StoveListEdit: React.FC<{
  stoves: Stove[];
  handleSetStove: SetStoveFunction;
  editable: boolean;
}> = ({ stoves, handleSetStove }) => {
  const [listShown, setListShown] = useState(true);
  return (
    <div>
      <p
        onClick={() => {
          setListShown(!listShown);
        }}
      >
        Stoves List:
      </p>
      {listShown &&
        stoves.map((stove: Stove) => (
          <StoveComponentEdit stove={stove} handleSetStove={handleSetStove} />
        ))}
    </div>
  );
};
