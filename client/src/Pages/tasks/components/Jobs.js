import { useEffect, useState } from "react";
import styles from "./Jobs.module.scss";
import { useUtilities } from "../../utility/Utility";
import { Table } from "../../components/Table";
const useAviableJobTypes = () => {
  const { data, error, isLoading } = useUtilities();
  const newAviaJobArr = [];
  data &&
    data.utilities.filter(
      (x) =>
        !newAviaJobArr.includes(x.jobType) &&
        !(x.jobType === "stove") &&
        newAviaJobArr.push(x.jobType)
    );
  return newAviaJobArr;
};
export const JobList = ({ jobs, editJob }) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className={styles.JobList}>
      {jobs.map((job, index) => (
        <>
          edit
          {/* <Job job={job} key={job._id} /> */}
          {!edit && (
            <>
              <EditJob editJob={(x) => console.log(x)} job={job} />
            </>
          )}
          <br></br>
        </>
      ))}
    </div>
  );
};
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

export const EditJob = ({ editJob, job }) => {
  const [type, setType] = useState(job.type);
  const [source, setSource] = useState(job.source);
  const [destination, setDestination] = useState(job.destination);
  const [startTime, setStartTime] = useState(null);
  // const [aviablejobtypes, setAviablejobtypes] = useState([]);
  const [sourceDropdownShown, setSourceDropdownShown] = useState(false);
  const [destDropdownShown, setDestDropdownShown] = useState(false);
  const [jobTypeListShown, setJobTypeListShown] = useState(false);
  const [configureUtilityShown, setConfigureUtilityShown] = useState(false);
  const { data, error, isLoading } = useUtilities();
  const aviablejobtypes = useAviableJobTypes();

  return (
    data && (
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
                {jobTypeListShown ? (
                  aviablejobtypes.map((type) => {
                    return (
                      <button
                        key={type}
                        onClick={() => {
                          setType(type);
                          setSource(null);
                          setJobTypeListShown(false);
                        }}
                      >
                        {type}
                      </button>
                    );
                  })
                ) : (
                  <button
                    key={type}
                    onClick={() => {
                      setJobTypeListShown(true);
                    }}
                  >
                    {type}
                  </button>
                )}
              </th>
              <th>
                {!source ? (
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
                ) : (
                  <button
                    onClick={() => {
                      setSource(null);
                      setSourceDropdownShown(true);
                    }}
                  >
                    {source.name}
                  </button>
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
              <th>
                {source && configureUtilityShown ? (
                  <div
                    style={{ position: "absolute" }}
                    onMouseLeave={() => setConfigureUtilityShown(false)}
                  >
                    <ConfigureUtility
                      utility={source}
                      utilUpdate={(newdata) => setSource(newdata)}
                    />
                  </div>
                ) : (
                  <button onClick={() => setConfigureUtilityShown(true)}>
                    Configure Utility
                  </button>
                )}
              </th>
              <th>
                <button
                  onClick={() => console.log({ type, source, destination })}
                >
                  SaveJob
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};
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
