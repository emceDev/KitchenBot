import { useEffect, useState } from "react";
import styles from "./Jobs.module.scss";
import { useUtilities } from "../../utility/Utility";

export const JobList = ({ jobs, editJob }) => {
  return (
    <div className={styles.JobList}>
      {jobs.map((job, index) => (
        <>
          {index}
          <Job job={job} key={job._id} />
          {editJob && (
            <>
              <button onClick={() => editJob("delete", job._id)}>Delete</button>
              <button onClick={() => editJob("up", job._id)}>UP</button>
              <button onClick={() => editJob("down", job._id)}>Down</button>
              <button>Edit time</button>
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
                  {source !== null
                    ? data.utilities.find((ut) => ut._id === source).name
                    : "Utilities"}
                </button>
              ) : (
                <div className={styles.list}>
                  {data.utilities.map((util) =>
                    util.jobType === type ? (
                      <button
                        onClick={() => {
                          setSource(util._id);
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
                  {data.utilites !== null &&
                    data.utilities.find((ut) => ut._id === destination).name}
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
                                setDestination(util._id);
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
      <label>Job type</label>
      <br></br>

      <label>
        Start time
        <input type="time" onChange={(e) => setStartTime(e.target.value)} />
      </label>
      <button onClick={() => addJob({ type, source, destination })}>
        add job
      </button>
    </div>
  ) : null;
};

const Job = ({ job }) => {
  return (
    <div>
      type : {job.type}
      Source: {job.source}
      destination :{job.destination}
    </div>
  );
};
const JobEdit = ({ job }) => {};

const configureUtility = ({ utility }) => {
  return <div>Utility to be configured</div>;
};
