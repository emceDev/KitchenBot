import { AddJobFunction } from "../../types/ReceipeTypes";
import { useState } from "react";

export const PauseJobComponent: React.FC<{ addjob: AddJobFunction }> = ({
  addjob,
}) => {
  const [pause, setPause] = useState<number>(0);
  return (
    <div>
      <label>
        duration:
        <input
          type="number"
          value={pause}
          onChange={(e) => setPause(parseInt(e.target.value))}
        />
      </label>
      <button onClick={() => addjob("pause", undefined, { duration: pause })}>
        save
      </button>
    </div>
  );
};
