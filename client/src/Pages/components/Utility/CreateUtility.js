export const CreateUtility = ({ m_id }) => {
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [position, setPosition] = useState(null);

  const [createUtility, res] = useCreateUtilityMutation();
  return (
    <div>
      <label>
        name:<input onChange={(e) => setName(e.target.value)}></input>
      </label>
      <label>
        type:
        <input type="text" onChange={(e) => setType(e.target.value)} />
      </label>
      <label>
        position:
        <input type="Number" onChange={(e) => setPosition(e.target.value)} />
      </label>
      <button
        onClick={() =>
          createUtility({
            m_id: m_id,
            name,
            type,
            position,
          })
        }
      >
        save
      </button>
    </div>
  );
};
