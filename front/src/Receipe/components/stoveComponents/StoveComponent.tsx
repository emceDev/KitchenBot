import {
  SetStoveFunction,
  Stove,
  handleAdjustStoveFunction,
} from "../../../types/ReceipeTypes";
import { useState } from "react";

// export const StoveComponent: React.FC<{
//   stove: Stove;
//   handleSetStove?: SetDestiationFunction;
// }> = ({ stove, handleSetStove }) => {
//   // const [options, setOptions] = useState<Stove["options"]>([]);
//   const [stoveData] = useState(stove);
//   return (
//     <div
//       key={stoveData.number.toString()}
//       onClick={() => handleSetStove && handleSetStove(stoveData)}
//     >
//       {stoveData.number}
//       <OptionComponent options={stoveData.options} />
//     </div>
//   );
// };
// export const StoveComponentEdit: React.FC<{
//   stove: Stove;
//   handleSetStove: SetDestiationFunction;
// }> = ({ stove, handleSetStove }) => {
//   const [stoveData, setStoveData] = useState(stove);
//   const setOption = (name: string, value: number) => {
//     console.log(name, value);
//     setStoveData((prevStove) => ({
//       ...prevStove,
//       options: prevStove.options.map((option) =>
//         option.name === name ? { ...option, value: value } : option
//       ),
//     }));
//   };
//   const handleSave = () => {
//     console.log("asving adjist");
//     console.log(stoveData.options);

//     handleSetStove(stoveData);
//     console.log("afterajdust");
//     console.log(stoveData.options);
//   };
//   return (
//     <div key={stoveData.number.toString()}>
//       {stoveData.number}
//       {stoveData.options.map((option) => (
//         <label>
//           {option.name}
//           <input
//             type="number"
//             value={option.value}
//             onChange={(e) => setOption(option.name, parseInt(e.target.value))}
//           />
//         </label>
//       ))}
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };

// component to display stove and return onclick

// component to edit stove and return stove and edited options onclick

// one component with passed down edit:bool

export const StoveComponent: React.FC<{
  stove: Stove;
  handleSetStove: SetStoveFunction;
}> = ({ stove, handleSetStove }) => {
  return (
    <div onClick={() => handleSetStove(stove)}>
      {stove.number}.{stove.name} : {stove.options.power}
    </div>
  );
};

export const StoveComponentEdit: React.FC<{
  stove: Stove;
  handleSetStove: SetStoveFunction;
}> = ({ stove, handleSetStove }) => {
  return (
    <div onClick={() => handleSetStove(stove)}>
      {stove.number}.{stove.name}
      OPTIONS:
      {Object.keys(stove.options).map((key) => (
        <p>
          {key}.{stove.options[key]}
        </p>
      ))}
    </div>
  );
};
export const StoveComponentAdjust: React.FC<{
  stove: Stove;
  handleAdjustStove: handleAdjustStoveFunction;
}> = ({ stove, handleAdjustStove }) => {
  const [newStove, setNewStove] = useState(stove);
  const [options, setOptions] = useState<Stove["options"]>(stove.options);
  const handleInputChange = (key: string, value: string | number) => {
    const updatedOptions = {
      ...options,
      [key]: value,
    };

    setOptions(updatedOptions);

    const updatedStove = {
      ...newStove,
      options: updatedOptions,
    };

    setNewStove(updatedStove);
  };
  return (
    <div>
      Adjusting stove:
      {stove.number}.{stove.name}
      {Object.keys(stove.options).map((key) => (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            id={key}
            type="text"
            value={options[key]}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => handleAdjustStove(newStove, options)}>save</button>
    </div>
  );
};
