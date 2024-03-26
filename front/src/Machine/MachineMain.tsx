import { Link } from "react-router-dom";
import { ReceipeList } from "../Receipe/ReceipeList";

export const MachineMain = () => {
  return (
    <div>
      <Link to="registerContainers">
        <button>Register Containers</button>
      </Link>
      <ReceipeList />
    </div>
  );
};
