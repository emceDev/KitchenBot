import { useEffect, useState } from "react";
import { useUtilities } from "../../../Utility/hooks";
import styles from "./Jobs.module.scss";
import { ConfigureUtility } from "../../../Utility/ConfigureUtility";
export const AddJob = ({ addJob }) => {
  const [type, setType] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [aviablejobtypes, setAviablejobtypes] = useState([]);
  const { data, error, isLoading } = useUtilities();
  const [sourceDropdownShown, setSourceDropdownShown] = useState(true);
  const [destDropdownShown, setDestDropdownShown] = useState(true);

  useEffect(() => {
    const newAviaJobArr = [];
    {
      error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        data &&
        data.utilities.filter(
          (x) =>
            !newAviaJobArr.includes(x.jobType) &&
            !(x.jobType === "stove") &&
            newAviaJobArr.push(x.jobType)
        )
      );
    }
    setAviablejobtypes(newAviaJobArr);
    console.log("add job effect", data);
  }, [data]);
  return error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <>Loading...</>
  ) : data ? (
    <div>
      <table>
        <thead>
          <tr>
            <th>Job type</th>
            <th>Utility</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              {aviablejobtypes.map((type) => {
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setType(type);
                      setSource(null);
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </th>
            <th>
              {!sourceDropdownShown ? (
                <button
                  onClick={() => setSourceDropdownShown(!sourceDropdownShown)}
                >
                  {source !== null ? source.name : "Utilities"}
                </button>
              ) : (
                <div className={styles.list}>
                  {data.utilities.map((util) =>
                    util.jobType === type ? (
                      <button
                        onClick={() => {
                          setSource(util);
                          setSourceDropdownShown(false);
                        }}
                      >
                        {util.name}
                      </button>
                    ) : null
                  )}
                </div>
              )}
            </th>
            <th>
              {!destDropdownShown ? (
                <button
                  onClick={() => setDestDropdownShown(!destDropdownShown)}
                >
                  {destination !== null && destination.name}
                </button>
              ) : (
                <div className={styles.Dropdown}>
                  <div>
                    <div className={styles.list}>
                      {data.utilities.map(
                        (util) =>
                          util.jobType === "stove" && (
                            <button
                              onClick={() => {
                                setDestination(util);
                                setDestDropdownShown(false);
                              }}
                            >
                              {util.name}
                            </button>
                          )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </th>
          </tr>
        </tbody>
      </table>
      <label>
        Start time
        <input type="time" onChange={(e) => setStartTime(e.target.value)} />
      </label>
      {source && (
        <ConfigureUtility
          utility={source}
          utilUpdate={(newdata) => setSource(newdata)}
        />
      )}
      <button onClick={() => addJob({ type, source, destination })}>
        Add job to task
      </button>
    </div>
  ) : null;
};
