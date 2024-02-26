import { useState } from "react";

export const ConfigureUtility = ({ utility, utilUpdate }) => {
  const [name, setName] = useState(utility.name);
  const [jobType, setJobType] = useState(utility.jobType);
  const [position, setPosition] = useState(utility.position);
  const [contents, setContents] = useState(utility.contents);
  const [options, setOptions] = useState(utility.options);
  const [updatedUtility, setUtility] = useState(utility);
  const configureUtil = (newdata) => {
    console.log(newdata);
    setUtility({ ...updatedUtility, ...newdata[0] });
  };
  const update = (name, newVal) => {
    setOptions(
      options.map((op) => {
        return op.name === name ? { ...op, set: newVal } : op;
      })
    );
  };
  return (
    <div>
      Utility to be configured{utility.name}
      <label>
        <div onChange={(e) => console.log(e.target.id)}>
          <input
            type="text"
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
          <input
            type="text"
            placeholder={position}
            onChange={(e) => setPosition(e.target.value)}
            id="position"
          />
          <input
            type="text"
            placeholder={jobType}
            onChange={(e) => setJobType(e.target.value)}
            id="jobType"
          />
        </div>
        Options:
        {options &&
          options.map((option) => (
            <div>
              {option.name}
              <div>
                {option.values.map((val, index) => (
                  <button
                    onClick={() => update(option.name, index)}
                    style={{
                      backgroundColor: index === option.set && "magenta",
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        {contents && (
          <>
            <input
              type="text"
              placehoder={contents.name}
              onChange={(e) =>
                setContents({ ...contents, name: e.target.value })
              }
            />
            <input
              type="text"
              placehoder={contents.type}
              onChange={(e) =>
                setContents({ ...contents, type: e.target.value })
              }
            />
          </>
        )}
        <button
          onClick={() =>
            utilUpdate({
              type: utility.type,
              options,
              contents,
              name,
              position,
              jobType,
            })
          }
        >
          Save options
        </button>
      </label>
    </div>
  );
};
