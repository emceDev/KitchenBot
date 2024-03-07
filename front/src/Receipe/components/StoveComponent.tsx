import { SetDestiationFunction, Stove } from "../../types/ReceipeTypes";
import { useState } from "react";

export const StoveComponent: React.FC<{
  stove: Stove;
  handleSetDestination: SetDestiationFunction;
  editable: Boolean;
}> = ({ stove, handleSetDestination, editable }) => {
  // const [options, setOptions] = useState<Stove["options"]>([]);
  const [stoveData, setStoveData] = useState(stove);
  const setOption = (name: string, value: number) => {
    console.log(name, value);
    setStoveData((prevStove) => ({
      ...prevStove,
      options: prevStove.options.map((option) =>
        option.name === name ? { ...option, value: value } : option
      ),
    }));
  };
  const handleSave = () => {
    handleSetDestination(stoveData);
  };
  return (
    <div
      key={stoveData.number.toString()}
      onClick={() => !editable && handleSetDestination(stoveData)}
    >
      {stoveData.number}
      {editable &&
        stoveData.options.map((option) => (
          <label>
            {option.name}
            <input
              type="number"
              value={option.value}
              onChange={(e) => setOption(option.name, parseInt(e.target.value))}
            />
          </label>
        ))}
      {editable && <button onClick={handleSave}>Save</button>}
    </div>
  );
};
