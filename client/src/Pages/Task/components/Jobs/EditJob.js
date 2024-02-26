import { useState } from "react";
import { useUtilities } from "../../../Utility/hooks";
import { useAviableJobTypes } from "../Jobs/hooks";
import styles from "./Jobs.module.scss";
import { ConfigureUtility } from "../../../Utility/ConfigureUtility";

export const EditJob = ({ editJob, job }) => {
  const [type, setType] = useState(job.type);
  const [source, setSource] = useState(job.source);
  const id = job._id;
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
                  onClick={() => editJob({ id, type, source, destination })}
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
