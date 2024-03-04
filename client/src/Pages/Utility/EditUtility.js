import { useState } from "react";
import {
  useEditUtilityMutation,
  useGetUtilityListQuery,
} from "../../State/services";

export const EditUtility = ({ m_id, u_id }) => {
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [position, setPosition] = useState(null);
  const { utility } = useGetUtilityListQuery(m_id, {
    selectFromResult: ({ data }) => ({
      utility: data.utilities.find((util) => util._id === u_id),
    }),
  });
  const [editUtility] = useEditUtilityMutation();
  return (
    <div>
      Utility
      <label>
        Name
        <input
          placeholder={utility.name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Type:
        <input
          placeholder={utility.type}
          onChange={(e) => setType(e.target.value)}
        />
      </label>
      <label>
        Position
        <input
          placeholder={utility.position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </label>
      <button
        onClick={() => {
          editUtility({ m_id, u_id, data: { name, position, type } });
        }}
      >
        Save
      </button>
    </div>
  );
};
