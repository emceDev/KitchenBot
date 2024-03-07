import { Stove, StoveSetter } from "../../types/ReceipeTypes";
import { StoveComponent } from "./StoveComponent";
import { StoveList } from "./StoveList";

// component is responsible for adjust job
// firstly it renders stove list(adjustables) to choose from
// secodnly it renders stove to edit
export const AdjustJobComponent: React.FC<{
  choosenStove: Stove;
  stoves: Stove[];
  setChoosenStove: StoveSetter;
  saveChanges: any;
}> = ({ choosenStove, stoves, setChoosenStove, saveChanges }) => {
  return (
    <div>
      {choosenStove === null && (
        <StoveList
          stoves={stoves}
          editable={false}
          handleSetDestination={setChoosenStove}
        />
      )}
      {choosenStove && (
        <StoveComponent
          editable={true}
          stove={choosenStove}
          handleSetDestination={saveChanges}
        />
      )}
    </div>
  );
};
