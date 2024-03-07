import { Stove, SetDestiationFunction } from "../../types/ReceipeTypes";
import { StoveComponent } from "./StoveComponent";

// accepts list of stoves, component is dumb for now, but later on it may be improved to do more
export const StoveList: React.FC<{
  stoves: Stove[];
  handleSetDestination: SetDestiationFunction;
  editable: boolean;
}> = ({ stoves, handleSetDestination, editable }) => {
  return (
    <div>
      {stoves.map((stove: Stove) => (
        <StoveComponent
          stove={stove}
          editable={editable}
          handleSetDestination={handleSetDestination}
        />
      ))}
    </div>
  );
};
